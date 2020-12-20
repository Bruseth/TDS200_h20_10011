import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonInput,
  useIonViewWillEnter,
  IonFabButton,
  IonIcon,
  IonSpinner,
  IonToast} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/nhost";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server"
import { arrowForwardCircle } from "ionicons/icons";
import RegisterModal from "../components/RegisterModal";
import MountenWave from "../components/MountenWave";
import { personAddOutline } from "ionicons/icons";

const mountenWave = encodeURIComponent(renderToStaticMarkup(<MountenWave />));

const Login = () => {
  const [registerModal, setRegisterModal] = useState({ isOpen: false });

  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);


  //funksjoner for innlogging og utlogging

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
          
          <RegisterButton onClick={() => setRegisterModal({ isOpen: true })}>
            <IonIcon icon={personAddOutline} />
          </RegisterButton>
        </CenterContainer>
        <RegisterModal 
        isOpen={registerModal.isOpen} 
        onClose={() => setRegisterModal({ isOpen: false })} 
        />

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


//styling
const LoginCard = styled(IonCard)`
padding: 20px;
background-color: #5E503F;

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${mountenWave}") no-repeat fixed;
background-size: cover;
background-color: #22333b;
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

const RegisterButton = styled(IonFabButton)`
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