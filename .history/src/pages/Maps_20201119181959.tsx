import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IonPage } from "@ionic/react";

const libraries = ["places"]

const Maps = () => {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  })


  return(
    <IonPage>

    </IonPage>
  )
}

export default Maps;