import { NextResponse } from "next/server";
import zipcodes from "zipcodes";

const ORIGIN_ZIP = "02151";
// Revere, MA coordinates
const ORIGIN_LNG = -70.9996;
const ORIGIN_LAT = 42.4084;

const FREE_MILES = 10;
const COST_PER_MILE = 2.50;

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of Earth in miles
  const rlat1 = lat1 * (Math.PI/180);
  const rlat2 = lat2 * (Math.PI/180);
  const difflat = rlat2 - rlat1;
  const difflon = (lon2 - lon1) * (Math.PI/180);
  return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2) + Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  
  // New overrides for custom origins and free miles (used for multi-stop routing)
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

  // Dynamic Origin
  const effectiveOriginLat = originLatParam ? parseFloat(originLatParam) : ORIGIN_LAT;
  const effectiveOriginLng = originLngParam ? parseFloat(originLngParam) : ORIGIN_LNG;
  
  // Dynamic Free Miles Threshold
  const effectiveFreeMiles = freeMilesParam !== null ? parseFloat(freeMilesParam) : FREE_MILES;

  // If ZIP is provided, validate it
  if (zip) {
    const lookup = zipcodes.lookup(zip);
    if (lookup) {
      if (lookup.state !== "MA") {
        return NextResponse.json({ error: "We currently only serve Massachusetts (MA)." }, { status: 400 });
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
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    if (googleKey && destLat && destLng) {
      // Get driving distance via Google Maps Distance Matrix API
      const originParam = `${effectiveOriginLat},${effectiveOriginLng}`;
      const destParam = `${destLat},${destLng}`;
      const routeRes = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originParam}&destinations=${destParam}&units=imperial&key=${googleKey}`
      );
      if (!routeRes.ok) throw new Error("Google API fetch failed");
      
      const routeData = await routeRes.json();
      
      if (routeData.status === "OK" && routeData.rows[0].elements[0].status === "OK") {
        // Google returns distance in meters if we don't specify imperial, but since we requested units=imperial,
        // it returns distance.value in METERS still, and distance.text in miles!
        // distance.value is always in meters regardless of the unit parameter.
        const distanceMeters = routeData.rows[0].elements[0].distance.value;
        distanceMiles = distanceMeters * 0.000621371; // Convert strictly to miles from meters
      } else {
        throw new Error("No route found by Google Maps");
      }
    } else {
      throw new Error("No Google Maps key or coords");
    }
  } catch (err) {
    // Fallback to straight line distance using Haversine
    if (destLat && destLng) {
      distanceMiles = haversineDistance(effectiveOriginLat, effectiveOriginLng, destLat, destLng);
    } else if (zip) {
      distanceMiles = zipcodes.distance(ORIGIN_ZIP, zip);
    }
  }
  
  // Round to 1 decimal place
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
    method: googleKey ? "driving" : "straight-line"
  });
}
