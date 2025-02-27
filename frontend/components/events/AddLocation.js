import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Utilisé pour charger des composants dynamiquement avec Next.js
import styles from "../../styles/Events.module.css";

// Charger react-leaflet uniquement côté client
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false } // Désactive le rendu côté serveur
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

function AddLocation({ form, handleFormChange }) {
  const [isClient, setIsClient] = useState(false);
  const [position, setPosition] = useState([48.8566, 2.3522]); // Paris comme coordonnées par défaut

  useEffect(() => {
    // Définissez un flag pour indiquer que nous sommes côté client
    setIsClient(true);
  }, []);

  const updatePosition = (lat, lng) => {
    setPosition([lat, lng]);
    handleFormChange({
      target: {
        name: "location",
        value: { lat, lng },
      },
    });
  };

  return (
    <div className={styles.form}>
      {isClient ? (
        <div className={styles.mapContainer} style={{ height: "400px" }}>
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={position}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  updatePosition(lat, lng);
                },
              }}
            >
              <Popup>
                Coordonnées : {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Chargement de la carte...</p>
      )}
    </div>
  );
}

export default AddLocation;