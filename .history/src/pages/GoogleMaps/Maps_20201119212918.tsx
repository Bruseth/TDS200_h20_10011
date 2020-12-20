
import { GoogleMap, GoogleMaps, MyLocation, Marker, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import { isPlatform } from '@ionic/react'
import { useLoadScript } from "@react-google-maps/api";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};


export default function Maps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";

  if (isLoaded) return "Loading";

  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}></GoogleMap>
    </div>
  )
