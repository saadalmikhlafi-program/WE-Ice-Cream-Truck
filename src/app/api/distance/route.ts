import { NextResponse } from "next/server";
import zipcodes from "zipcodes";
import prisma from "@/lib/prisma";
import { routingProvider, BASE_LOCATION } from "@/lib/maps";

const FREE_MILES = 10;
const COST_PER_MILE = 2.50;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  
  const originLatParam = searchParams.get("originLat");
  const originLngParam = searchParams.get("originLng");
  const freeMilesParam = searchParams.get("freeMiles");

  if (!zip && (!latParam || !lngParam)) {
    return NextResponse.json({ error: "Missing ZIP code or coordinates" }, { status: 400 });
  }

  let destLat = latParam ? parseFloat(latParam) : null;
  let destLng = lngParam ? parseFloat(lngParam) : null;
  let destCity = "Selected Location";
  let destState = "MA";
  let destZip = zip || "";

  const effectiveOriginLat = originLatParam ? parseFloat(originLatParam) : BASE_LOCATION.lat;
  const effectiveOriginLng = originLngParam ? parseFloat(originLngParam) : BASE_LOCATION.lng;
  const effectiveFreeMiles = freeMilesParam !== null ? parseFloat(freeMilesParam) : FREE_MILES;

  if (zip) {
    const lookup = zipcodes.lookup(zip);
    
    // Validate against database
    const serviceZip = await prisma.serviceZipCode.findUnique({
      where: { zip: zip }
    });

    if (!serviceZip || !serviceZip.isActive) {
      return NextResponse.json({ 
        error: "Sorry, our services are not currently available in this location, but will be available soon!" 
      }, { status: 400 });
    }

    if (lookup) {
      if (lookup.state !== "MA") {
        return NextResponse.json({ 
          error: "Sorry, our services are not currently available in this location, but will be available soon!" 
        }, { status: 400 });
      }
      if (!destLat || !destLng) {
        destLat = lookup.latitude;
        destLng = lookup.longitude;
      }
      destCity = lookup.city;
      destState = lookup.state;
    } else if (!destLat || !destLng) {
      return NextResponse.json({ error: "Invalid ZIP code and no coordinates provided" }, { status: 404 });
    }
  }

  let distanceMiles = 0;

  if (destLat && destLng) {
    distanceMiles = await routingProvider.getDrivingDistanceMiles(effectiveOriginLat, effectiveOriginLng, destLat, destLng);
  } else if (zip) {
    const lookup = zipcodes.lookup(zip);
    if (lookup) {
       distanceMiles = await routingProvider.getDrivingDistanceMiles(effectiveOriginLat, effectiveOriginLng, lookup.latitude, lookup.longitude);
    }
  }
  
  distanceMiles = Math.round(distanceMiles * 10) / 10;

  let fee = 0;
  if (distanceMiles > effectiveFreeMiles) {
    fee = (distanceMiles - effectiveFreeMiles) * COST_PER_MILE;
  }

  return NextResponse.json({
    zip: destZip,
    city: destCity,
    state: destState,
    distance: distanceMiles,
    fee: Number(fee.toFixed(2)),
    freeMiles: effectiveFreeMiles,
    costPerMile: COST_PER_MILE,
    method: "routing-provider"
  });
}
