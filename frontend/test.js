import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import styles from "../../styles/Events.module.css";

function AddLocation({ form, handleFormChange }) {
  // Centre initial de la carte (exemple : Paris)
  const [position, setPosition] = useState([48.8566, 2.3522]); // Paris coords

  // Fonction déclenchée lors du "drag" du marqueur
  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition([lat, lng]);

    // Mettre à jour le formulaire parent avec les nouvelles coordonnées
    handleFormChange({
      target: {
        name: "location",
        value: { lat, lng }, // Ex: {lat: 48.8566, lng: 2.3522}
      },
    });
  };

  return (
    <div className={styles.form}>
      {/* Carte Leaflet */}
      <div className={styles.mapContainer} style={{ height: "400px" }}>
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          {/* Couche des tuiles OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Marqueur draggable */}
          <Marker position={position} draggable eventHandlers={{ dragend: handleMarkerDrag }}>
            <Popup>
              Coordonnées sélectionnées : {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default AddLocation;