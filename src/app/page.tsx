// TODO: Improve the district popup

"use client";

import { Map, AttributionControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import { X, Search } from "lucide-react";

export default function Home() {
    const mapRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // South Africa bounding box
    const bounds = [
        [16.45, -34.83], // SW
        [32.89, -22.13], // NE
    ];

    // Fetch suggestions when searchQuery changes
    useEffect(() => {
        if (!searchQuery || !isFocused) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&countrycodes=za&limit=5`
                );
                const data = await response.json();
                setSuggestions(data);
                console.log(suggestions)
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, isFocused]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&countrycodes=za&limit=1`
            );
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                if (mapRef.current) {
                    mapRef.current.flyTo({
                        center: [parseFloat(lon), parseFloat(lat)],
                        zoom: 15,
                    });
                    setSuggestions([]);
                }
            } else {
                console.log("No results found");
            }
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.display_name);
        setSuggestions([]);
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [parseFloat(suggestion.lon), parseFloat(suggestion.lat)],
                zoom: 15,
            });
        }
    };

    return (
        <main className="relative flex-grow bg-gray-100 h-100vh">
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: 24,
                    latitude: -30,
                    zoom: 5,
                }}
                style={{ width: "100vw", height: "93vh" }}
                mapStyle="https://demotiles.maplibre.org/style.json"
                onLoad={() => {
                    const map = mapRef.current.getMap();

                    try {
                        // Add GeoJSON source
                        map.addSource("districts", {
                            type: "geojson",
                            data: "/data/MDB_District_Municipal_Boundary_2018.geojson",
                            promoteId: "DISTRICT",
                        });
                        console.log("Source added successfully");

                        // Add fill layer with zero opacity to maintain hover functionality
                        map.addLayer({
                            id: "district-fills",
                            type: "fill",
                            source: "districts",
                            paint: {
                                "fill-color": "#000000",
                                "fill-opacity": 0, // Fully transparent
                            },
                        });

                        // Boundary line layer with subdued styling
                        map.addLayer({
                            id: "district-boundaries",
                            type: "line",
                            source: "districts",
                            paint: {
                                "line-color": "#555555", // Dark gray for subtle boundaries
                                "line-width": 1.5, // Thinner line for less visual dominance
                                "line-opacity": 0.7, // Slightly transparent
                            },
                        });
                        console.log("Boundary layer added");

                        // Interaction state
                        let hoveredId = null;

                        // Hover effect
                        map.on("mousemove", "district-fills", (e) => {
                            console.log("Mouse move event:", e.features);
                            if (e.features?.length) {
                                const id = e.features[0].id;
                                if (hoveredId !== null && hoveredId !== id) {
                                    map.setFeatureState(
                                        { source: "districts", id: hoveredId },
                                        { hover: false }
                                    );
                                }
                                if (id !== null) {
                                    hoveredId = id;
                                    map.setFeatureState(
                                        { source: "districts", id },
                                        { hover: true }
                                    );
                                }
                            }
                        });

                        map.on("mouseleave", "district-fills", () => {
                            if (hoveredId !== null) {
                                map.setFeatureState(
                                    { source: "districts", id: hoveredId },
                                    { hover: false }
                                );
                            }
                            hoveredId = null;
                        });

                        // Click popup
                        map.on("click", "district-fills", (e) => {
                            console.log("Click event:", e.features);
                            if (!e.features?.length) return;
                            const feature = e.features[0];
                            new maplibregl.Popup()
                                .setLngLat(e.lngLat)
                                .setHTML(
                                    `<strong>District:</strong> ${
                                        feature.properties?.DISTRICT_N || "Unknown"
                                    }`
                                )
                                .addTo(map);
                        });

                        // Fit map to South Africa
                        map.fitBounds(bounds, { padding: 20 });
                    } catch (error) {
                        console.error("Error adding map elements:", error);
                    }

                    // General map error listener
                    map.on("error", (e) => {
                        console.error("Map error:", e);
                    });
                }}
            >
                <AttributionControl customAttribution="Maptiler" />
            </Map>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 max-w-md w-full px-4">
                <form onSubmit={handleSearch} className="flex flex-row justify-center px-2">
                    <div className="flex flex-row space-x-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="flex-1 sm:w-xs md:w-xl px-4 py-2 rounded-full border border-gray-300
                            focus:outline-none focus:ring-2 bg-white"
                            placeholder="Search locations in South Africa..."
                        />
                        <div className="flex justify-items-center w-fit h-fit text-white rounded-full cursor-pointer
                        bg-[#1E4B26]">
                            <button className="cursor-pointer p-2" onClick={() => {setSearchQuery("")}}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex justify-items-center w-fit h-fit text-white rounded-full cursor-pointer
                        bg-[#1E4B26]">
                            <button className="cursor-pointer p-2" type="submit">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </form>
                {suggestions.length > 0 && (
                    <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.place_id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

// https://demotiles.maplibre.org/style.json
// https://api.maptiler.com/maps/streets-v2/style.json?key=hViUNvGNuVWU7t6fQi6L