import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ detections }) {
  return (
    <MapContainer center={[28.7041, 77.1025]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {detections.map((detection, index) => (
        <Marker key={index} position={[detection.lat, detection.lon]}>
          <Popup>🔥 Fire detected here!</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
