// TODO: Add a map from MapBox
'use client'

import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useEffect } from "react";

export default function Home() {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current.getMap(); // underlying MapLibre map instance

        // South Africa bounding box: [west, south, east, north]
        const bounds = [
            [16.45, -34.83], // SW corner
            [32.89, -22.13]  // NE corner
        ];

        map.fitBounds(bounds, {
            padding: 20
        });
    }, []);
  return (
      <>
          <main className="flex-grow bg-gray-100 h-100vh">
              <Map
                  ref={mapRef}
                  initialViewState={{
                      longitude: 24,
                      latitude: -30,
                      zoom: 5
                  }}
                  style={{ width: "100vw", height: "100vh" }}
                  mapStyle="https://demotiles.maplibre.org/style.json"
              />
          </main>
      </>
  );
}

// https://demotiles.maplibre.org/style.json
// https://api.maptiler.com/maps/streets-v2/style.json?key=hViUNvGNuVWU7t6fQi6L