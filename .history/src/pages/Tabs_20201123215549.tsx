import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cameraOutline, homeOutline, personOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useAuth } from "react-nhost";
import { Redirect, Route } from "react-router";
import styled from "styled-components";
import PrivateRoute from "../components/PrivateRoute";
import Detail from "./Detail";
import Home from "./Home";
import Login from "./Login";

import NewPost from "./NewPost";
import Profile from "./Profile/Profile";
import ProfileGalleri from "./Profile/ProfileGalleri";


const Tabs = () => {

  const { signedIn } = useAuth();

  //Laget navigasjon med IonTabBar. Det blir fremvist forskjellig bar om brukeren er logget inn eller ikke. 
  //Også lagt begrensinger for hvor brukeren kan g


  return (


    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/newpost" component={NewPost} exact={true} />
          <Route path="/detail/:id" component={Detail} exact={true} />
          <PrivateRoute path="/profile" component={Profile} exact={true} />
          <PrivateRoute path="/profilegalleri/:id" component={ProfileGalleri} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
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
          {!signedIn ? (
            <IonTabButton tab="login" href="/login">
              <UserIcon icon={personOutline} />
              <IonLabel>Logg inn</IonLabel>
            </IonTabButton>
          ) : (
            <IonTabButton tab="profile" href="/profile">
            <UserIcon icon={personOutline} />
            <IonLabel>Min bruker</IonLabel>
          </IonTabButton>
            )
          };

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
