
import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";


const Maps = () => {

 

  return(
    <IonPage>
      <IonContent>
        <h3>Ionic GoogleMaps Starter</h3>
        <div id="map_canvas">
          <IonButton onClick=(event)>Starter</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Maps;
