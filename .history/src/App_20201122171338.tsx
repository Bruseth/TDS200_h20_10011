import React, { useState } from 'react';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { auth } from './utils/nhost';
import { NhostAuthProvider, NhostApolloProvider, useAuth } from 'react-nhost';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from './pages/Tabs';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import { IonReactRouter } from '@ionic/react-router';

import { homeOutline, cameraOutline, personOutline } from 'ionicons/icons';
import PrivateRoute from './components/PrivateRoute';
import NewPost from './pages/NewPost';




const App: React.FC = () => {

  const { signedIn } = useAuth();



  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider auth={auth} gqlEndpoint={'https://hasura-ck80jrpa.nhost.app/v1/graphql'}>
        <IonApp>
          <Tabs/>
        </IonApp>
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

const UserIcon = styled(IonIcon)`
  --background: #37323E;
  align-self: center;
  `;


export default App;
