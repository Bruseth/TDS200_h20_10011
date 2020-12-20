
import { GoogleMap, GoogleMaps, MyLocation, Marker, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import { isPlatform } from '@ionic/react'
import { useLoadScript } from "@react-google-maps/api";


const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";

  if (isLoaded) return "Loading";

  return (
    <div>
      <GoogleMap mapContainerStyle={}
    </div>
  )