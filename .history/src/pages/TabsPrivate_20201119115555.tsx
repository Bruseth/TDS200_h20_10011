import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonApp, IonToast } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cameraOutline, homeOutline, personOutline } from "ionicons/icons";
import React, { useState } from "react";
import { NhostApolloProvider, NhostAuthProvider, useAuth } from "react-nhost";
import { Redirect, Route } from "react-router";
import styled from "styled-components";
import PrivateRoute from "../components/PrivateRoute";
import { auth } from "../utils/nhost";
import Detail from "./Detail";
import Home from "./Home";
import Login from "./Login";
import NewPost from "./NewPost";
import RegisterUser from "./RegisterUser";
import Slides from "./Slides";


const Tabs = () => {

  const { signedIn } = useAuth();
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);


  return (

   
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/home" component={Home} exact={true} />
                <Route path="/slides" component={Slides} exact={true} />
                <PrivateRoute path="/newpost" component={NewPost} exact={true} />
                <Route path="/detail/:id" component={Detail} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="Hjem" href="/home">
                  <IonIcon icon={homeOutline} />
                  <IonLabel>Hjem</IonLabel>
                </IonTabButton>
                <IonTabButton tab="newpost" href="/newpost">
                  <IonIcon icon={cameraOutline} />
                  <IonLabel>Ta bilde</IonLabel>
                </IonTabButton>
                <IonTabButton tab="newpost" href="/newpost">
                  <UserIcon icon={personOutline} />
                  <IonLabel>Min bruker</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
   

  );
}



const UserIcon = styled(IonIcon)`
  --background: #37323E;
  align-self: center;
  `;


export default Tabs;