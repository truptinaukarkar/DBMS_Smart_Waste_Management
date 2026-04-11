import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function CampusMap({
  center = [19.076, 72.8777],
  zoom = 16,
  markers = [],
  selectedLocation,
  onLocationSelect,
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 200);
  }, []);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* CLICK HANDLER */}
        {onLocationSelect && <LocationSelector onSelect={onLocationSelect} />}

        {/* STATIC MARKERS */}
        {markers.map((marker, index) => (
          <Marker key={`${marker.lat}-${marker.lng}-${index}`} position={[marker.lat, marker.lng]} />
        ))}

        {/* SELECTED MARKER */}
        {selectedLocation && (
          <Marker
            position={[
              selectedLocation.lat,
              selectedLocation.lng,
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
}
