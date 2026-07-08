import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  
  try {
    let url = "";
    if (action === "search") {
      const q = searchParams.get("q");
      if (!q) return NextResponse.json([], { status: 200 });
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5&countrycodes=us`;
    } else if (action === "reverse") {
      const lat = searchParams.get("lat");
      const lon = searchParams.get("lon");
      if (!lat || !lon) return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=18`;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "WeIceCreamTruck/1.0 (info@weicecreamtruck.com)"
      }
    });

    if (!res.ok) {
      throw new Error(`Nominatim API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Geocoding Proxy Error:", error);
    return NextResponse.json({ error: "Failed to fetch from geocoding service" }, { status: 500 });
  }
}
