"use client";

import { Map, useControl, Popup, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import { X, Search, LoaderCircle } from "lucide-react";
import MapPopup from "./_components/map_popup";

export default function Home() {
    const mapRef = useRef(null);
    const [popupInfo, setPopupInfo ] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const fillLayer = {
        id: "district-fills",
        type: "fill",
        paint: {"fill-color": "#000000", "fill-opacity": 0},
    };

    const boundaryLayer = {
        id: "district-boundaries",
        type: "line",
        paint: { "line-color": "#555555", "line-width": 1.5, "line-opacity": 0.7 },
    };

    const handleClick = (e) => {
        const features = e.features;
        if (features?.length){
            const feature = features[0];
            setPopupInfo({
                lngLat: e.lngLat,
                districtName: feature.properties?.DISTRICT_N || "Unknown",
            })
        }
    }

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
            setLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&countrycodes=za&limit=5`
                );
                const data = await response.json();
                setLoading(false);
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
                initialViewState={{longitude: 24, latitude: -30, zoom: 5}}
                style={{width: "100vw", height: "93vh"}}
                mapStyle="https://demotiles.maplibre.org/style.json"
                interactiveLayerIds={["district-fills"]}
                onClick={handleClick}
                onLoad={() => {
                    const map = mapRef.current.getMap();
                    map.fitBounds(bounds, {padding: 20});
                }}
            >
                <Source id="districts" type="geojson" data="/data/MDB_District_Municipal_Boundary_2018.geojson"
                        promoteId="DISTRICT">
                    <Layer {...fillLayer}/>
                    <Layer {...boundaryLayer}/>
                </Source>

                {popupInfo && (
                    <Popup
                        longitude={popupInfo.lngLat.lng}
                        latitude={popupInfo.lngLat.lat}
                        anchor="top"
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                        className="max-w-xs"
                    >
                        <MapPopup district_name={popupInfo.districtName}/>
                    </Popup>
                )}
            </Map>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 max-w-md w-full px-4 gap-y-2">
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
                {loading && <LoaderCircle className="mx-auto my-4 animate-spin"/>}
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