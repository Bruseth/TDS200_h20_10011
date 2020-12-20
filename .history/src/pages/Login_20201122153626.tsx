import React, { useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IonPage,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  useIonViewWillEnter,
  IonFabButton,
  IonIcon,
  IonSpinner,
  IonToast,
  IonModal
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/nhost";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server"
import { arrowForwardCircle } from "ionicons/icons";
import WaveBlob from "../components/WaveBlob";
import RegisterUser from "./RegisterUser";

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));

const Login = () => {
  const [registerModal, setRegisterModal] = useState({ isOpen: false });

  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);



  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace("/home");
    }
  });

  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.login(emailAddress, password);
      setIsAuthenticating(false);
      history.replace("/home");
    } catch (exception) {
      console.error(exception);
      setIsAuthenticating(false);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonContentStyled>
        <CenterContainer>
          <PageTitle>Turglad</PageTitle>
          <LoginCard>
            <IonList>
              <IonItem color="dark">
                <IonInput placeholder="Epostadresse" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
              </IonItem>
              <IonItem color="dark">
                <IonInput placeholder="Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
              </IonItem>
            </IonList>
          </LoginCard>
          <LoginButton onClick={authenticateUser}>
            {
              isAuthenticating ?
                <IonSpinner name="crescent" /> :
                <IonIcon icon={arrowForwardCircle} />
            }
          </LoginButton>
          <IonButton onClick={() => setRegisterModal({ isOpen: true })}>
            Register bruker?
          </IonButton>
        </CenterContainer>
        <IonModal 
        isOpen={registerModal.isOpen} 
        onClose={() => setRegisterModal({ isOpen: false })} >
          
          <IonButton onClick={() => setRegisterModal({ isOpen: true })}>
            Modal
          </IonButton>

        </IonModal>

        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Feil brukernavn/passord"
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonPage>
  )
};

const LoginCard = styled(IonCard)`
padding: 20px;
background-color: #5E503F;

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${waveBlobString}") no-repeat fixed;
background-size: cover;
background-color: #EAE0D5;
`;

const PageTitle = styled.h1`
font-size: 3em; 
align-self: center;
color: #0a0908;
font-family: 'Quicksand', sans-serif;
`;

const LoginButton = styled(IonFabButton)`
--background: #37323E;
align-self: center;
`;

const CenterContainer = styled.div`
display: flex; 
justify-content: center; 
flex-direction: column; 
height: 100%;
`;


export default Login;