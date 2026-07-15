"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Search, Loader2, X, Navigation, GripVertical, LocateFixed, Edit3, Map as MapIcon, Home } from "lucide-react";

// Nominatim result type
interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    county?: string;
  };
}

interface LocationPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onLocationSelect: (data: {
    address: string;
    city: string;
    zip: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function LocationPicker({
  address,
  onAddressChange,
  onLocationSelect,
}: LocationPickerProps) {
  const [query, setQuery] = useState(address);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    display: string;
    street: string;
    city: string;
    zip: string;
  } | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualZip, setManualZip] = useState("");
  const [locating, setLocating] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix for strict mode "Map container is already initialized"
      const container = mapContainerRef.current as any;
      if (container && container._leaflet_id) {
        container._leaflet_id = null;
      }

      // Default to Boston, MA
      const defaultCenter: [number, number] = [42.3601, -71.0589];

      const map = L.map(container, {
        center: defaultCenter,
        zoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      // Add zoom control to bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Use a clean, modern tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        }
      ).addTo(map);

      // Custom marker icon
      const markerIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-pin">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52" fill="none">
            <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 32 20 32s20-18 20-32C40 8.954 31.046 0 20 0z" fill="#FF6B6B"/>
            <circle cx="20" cy="18" r="8" fill="white"/>
            <circle cx="20" cy="18" r="4" fill="#FF6B6B"/>
          </svg>
        </div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52],
      });

      // Home Marker (We Ice Cream Truck HQ)
      const homeCenter: [number, number] = [42.4084, -70.9996]; // 02151 Revere, MA
      const homeIcon = L.divIcon({
        className: "home-marker",
        html: `<div class="marker-pin">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52" fill="none">
            <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 32 20 32s20-18 20-32C40 8.954 31.046 0 20 0z" fill="#0A1128"/>
            <circle cx="20" cy="18" r="10" fill="white"/>
            <circle cx="20" cy="18" r="5" fill="#0A1128"/>
          </svg>
        </div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52],
      });

      L.marker(homeCenter, { icon: homeIcon }).addTo(map).bindTooltip("We Ice Cream Truck (02151)", { permanent: true, direction: "right", className: "font-bold text-navy" });

      const marker = L.marker(defaultCenter, {
        icon: markerIcon,
        draggable: true,
      }).addTo(map);

      // Handle marker drag
      marker.on("dragstart", () => {
        setIsDragging(true);
      });

      marker.on("dragend", async () => {
        setIsDragging(false);
        const pos = marker.getLatLng();
        await reverseGeocode(pos.lat, pos.lng);
      });

      // Handle map click
      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        await reverseGeocode(lat, lng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setMapReady(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Reverse geocode a lat/lng to get the address
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`, {
        headers: { 'Accept-Language': 'en-US,en' }
      });
      if (!res.ok) throw new Error("Geocoding failed");
      
      const data = await res.json();
      const addr = data.address || {};
      const streetAddress = [addr.house_number, addr.road].filter(Boolean).join(" ");
      const cityName = addr.city || addr.town || addr.village || "";
      const zipCode = addr.postcode || "";
      const state = addr.state || "";
      
      const fullAddress = streetAddress || cityName || data.display_name.split(",")[0];
      const displayStr = `${fullAddress}${cityName && cityName !== fullAddress ? `, ${cityName}` : ""}${state ? `, ${state}` : ""}${zipCode ? ` ${zipCode}` : ""}`;
      
      setQuery(displayStr);
      onAddressChange(displayStr);
      setSelectedLocation({ lat, lng, display: displayStr, street: streetAddress || "", city: cityName, zip: zipCode });
      
      onLocationSelect({
        address: displayStr,
        city: cityName,
        zip: zipCode,
        lat,
        lng,
      });
    } catch (err) {
      console.error(err);
      const fallbackAddress = `Selected Location`;
      setQuery(fallbackAddress);
      onAddressChange(fallbackAddress);
      setSelectedLocation({ lat, lng, display: fallbackAddress, street: "", city: "", zip: "" });
      
      onLocationSelect({
        address: fallbackAddress,
        city: "",
        zip: "",
        lat,
        lng,
      });
    }
  };

  // Search for addresses
  const searchAddress = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/geocode?action=search&q=${encodeURIComponent(searchQuery + ", Massachusetts, USA")}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data: NominatimResult[] = await res.json();

      // Filter to Massachusetts only
      const maResults = data.filter(
        (r) => r.address?.state === "Massachusetts"
      );
      setSuggestions(maResults.length > 0 ? maResults : data.slice(0, 5));
      setShowSuggestions(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  const handleInputChange = (value: string) => {
    setQuery(value);
    onAddressChange(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchAddress(value);
    }, 400);
  };

  // Select a suggestion
  const selectSuggestion = (result: NominatimResult) => {
    const addr = result.address;
    const streetAddress = [addr?.house_number, addr?.road]
      .filter(Boolean)
      .join(" ");
    const cityName = addr?.city || addr?.town || addr?.village || "";
    const zipCode = addr?.postcode || "";
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const fullAddress = streetAddress || result.display_name.split(",")[0];

    setQuery(fullAddress);
    onAddressChange(fullAddress);
    setShowSuggestions(false);
    setSelectedLocation({ lat, lng, display: fullAddress, street: streetAddress || "", city: cityName, zip: zipCode });

    // Move map to the selected location
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15, { duration: 1.2 });
      markerRef.current.setLatLng([lat, lng]);
    }

    onLocationSelect({
      address: fullAddress,
      city: cityName,
      zip: zipCode,
      lat,
      lng,
    });
  };

  // Locate Me
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.2 });
          markerRef.current.setLatLng([latitude, longitude]);
        }
        await reverseGeocode(latitude, longitude);
        setLocating(false);
      },
      (error) => {
        console.error("Locate error:", error);
        alert("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  };

  return (
    <div className="space-y-5">
      {/* Manual Mode UI */}
      {manualMode && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black font-display text-navy">Manual Location Entry</h3>
            <button 
              onClick={() => setManualMode(false)}
              className="px-4 py-2 bg-navy text-white text-sm font-bold rounded-xl shadow-md hover:bg-navy-light transition-all flex items-center gap-2"
            >
              <MapIcon className="w-4 h-4" /> Use Map Instead
            </button>
          </div>
          
          <div>
            <label className="text-sm font-bold text-navy ml-1">Street Address</label>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onAddressChange(e.target.value);
                onLocationSelect({ address: e.target.value, city: "", zip: manualZip, lat: 0, lng: 0 });
              }}
              placeholder="123 Main St, Boston"
              className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-navy ml-1">ZIP Code (For Distance Calculation)</label>
            <input
              type="text"
              value={manualZip}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
                setManualZip(val);
                onLocationSelect({ address: query, city: "", zip: val, lat: 0, lng: 0 });
              }}
              placeholder="e.g. 02151"
              className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 outline-none"
            />
          </div>
        </div>
      )}

      {/* Map Mode UI */}
      <div className={manualMode ? "hidden" : "block"}>
      {/* Top Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleLocateMe}
          disabled={locating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-navy text-white font-bold rounded-xl shadow-md hover:bg-navy-light transition-all disabled:opacity-50"
        >
          {locating ? <Loader2 className="w-5 h-5 animate-spin" /> : <LocateFixed className="w-5 h-5" />}
          Locate Me Automatically
        </button>
        <button
          onClick={() => setManualMode(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-coral text-white font-bold rounded-xl shadow-md hover:bg-coral-dark transition-all"
        >
          <Edit3 className="w-5 h-5" />
          Enter Address Manually
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-navy ml-1">
          Or Search Location
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Start typing an address in Massachusetts..."
            className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 focus:border-coral/40 outline-none transition-all font-medium"
          />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-coral" />
          )}
          {query && !isSearching && (
            <button
              onClick={() => {
                setQuery("");
                onAddressChange("");
                setSuggestions([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-navy/10 overflow-hidden"
            >
              {suggestions.map((result) => {
                const addr = result.address;
                const primary = [addr?.house_number, addr?.road]
                  .filter(Boolean)
                  .join(" ");
                const secondary = [
                  addr?.city || addr?.town || addr?.village,
                  addr?.state,
                  addr?.postcode,
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <button
                    key={result.place_id}
                    onClick={() => selectSuggestion(result)}
                    className="w-full text-left px-5 py-3.5 hover:bg-coral/5 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-navy text-sm truncate">
                        {primary || result.display_name.split(",")[0]}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {secondary || result.display_name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner">
        <div
          ref={mapContainerRef}
          className="w-full h-[320px] md:h-[380px] z-0"
        />

        {/* Map loading overlay */}
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">
                Loading map...
              </p>
            </div>
          </div>
        )}

        {/* Dragging indicator */}
        {isDragging && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-navy/90 backdrop-blur text-white text-xs font-bold rounded-full shadow-lg">
            Release to set location
          </div>
        )}

        {/* Drag hint badge */}
        {mapReady && !isDragging && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/90 backdrop-blur border border-gray-200 text-gray-600 text-xs font-semibold rounded-full shadow-lg flex items-center gap-2">
            <GripVertical className="w-3.5 h-3.5" />
            Drag the pin or click the map to adjust
          </div>
        )}
      </div>

      {/* Selected location display */}
      {selectedLocation && (
        <div className="flex items-start gap-3 p-4 bg-mint/5 border border-mint/20 rounded-2xl">
          <div className="w-9 h-9 rounded-full bg-mint/20 text-mint flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-mint uppercase tracking-wider mb-1">📍 Event Location Confirmed</p>
            {selectedLocation.street && (
              <p className="text-sm font-bold text-navy">{selectedLocation.street}</p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
              {selectedLocation.city && (
                <span className="text-sm text-gray-600 font-medium">
                  🏙 <span className="font-bold text-navy">{selectedLocation.city}</span>
                </span>
              )}
              {selectedLocation.zip && (
                <span className="text-sm text-gray-600 font-medium">
                  📮 ZIP: <span className="font-bold text-navy">{selectedLocation.zip}</span>
                </span>
              )}
              {!selectedLocation.street && !selectedLocation.city && (
                <span className="text-sm text-gray-500">{selectedLocation.display}</span>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
