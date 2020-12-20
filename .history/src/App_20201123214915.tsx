import React from 'react';
import { IonApp, IonIcon } from '@ionic/react';
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



const App: React.FC = () => {




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



export default App;
