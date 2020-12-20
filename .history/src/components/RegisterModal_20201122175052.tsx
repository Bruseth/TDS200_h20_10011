import { IonPage, IonList, IonItem, IonInput, IonButton, IonToast, IonCard, IonContent, useIonViewWillEnter, IonToolbar, IonButtons, IonBackButton, IonHeader, IonIcon, IonAvatar, IonThumbnail, IonModal, IonFabButton } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../utils/nhost";
import WaveBlob from "../components/WaveBlob";
import { renderToStaticMarkup } from "react-dom/server";
import { useHistory } from "react-router";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { useImageUpload } from "../utils/hooks/usePhotoUpload";
import { cameraOutline, checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { CameraResultType } from "@capacitor/core";
import MountenWave from "../components/MountenWave";

const mountenWave = encodeURIComponent(renderToStaticMarkup(<MountenWave />));



const RegisterModal: React.FC<any> = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState({ isOpen: false });
  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [filename, setFilename] = useState<string | null>(null);
  const { startUploading } = useImageUpload();
  const { photo, getPhoto } = useCamera();


  const triggerCamera = async () => {
    await getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 20,
      allowEditing: false
    });
    setFilename(`${Date.now().toString()}.jpeg`)
  }

  const registerUser = async () => {
    if (photo?.dataUrl) {
      await startUploading({
        base64String: photo?.dataUrl!,
        filenameWithExtension: filename!
      })
    }
    try {
      await auth.register(emailAddress, password, {
        display_name: userName,
        avatar_url: filename ? filename : "default-avatar.jpg"
      })

      history.replace("/home")
    } catch (e) {
      console.error(e);
      setShowErrorToast(true);
    }

  }
  return (
    <IonModal isOpen={isOpen}>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={triggerCamera}>
              Ta profilbilde
              <IonIcon icon={cameraOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContentStyled>
        <CenterContainer>
          <PageTitle>Opprett profil</PageTitle>

          <ThumbnailStyeld>
            {!filename ? (
              <img src={"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"} />
            ) : (
                <img src={photo?.dataUrl} />
              )
            }
          </ThumbnailStyeld>
          <RegisterCard>
            <IonList>
              <IonItem color="dark">
                <IonInput placeholder="Nytt brukernavn" onIonInput={(e: any) => setUserName(e.target.value)} />
              </IonItem>
              <IonItem color="dark">
                <IonInput placeholder="Ny E-post" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
              </IonItem>
              <IonItem color="dark">
                <IonInput placeholder="Nytt Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
              </IonItem>
            </IonList>
          </RegisterCard>
          <RegisterIonFab onClick={registerUser}>
            <IonIcon icon={checkmarkCircleOutline}/>
            </RegisterIonFab>

          <BackButton onClick={onClose}>
            <IonIcon icon={closeCircleOutline}></IonIcon>
          </BackButton>
        </CenterContainer>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Bruker ekister allerede/mangler passord"
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonModal>
  )
};

const StyledToolBar = styled(IonToolbar)`
--background: none;
background-color: #22333B;
`;

const RegisterIonFab = styled(IonFabButton)`
--background: #37323E;
align-self: center;
`;

const BackButton = styled(IonFabButton)`
--background: #37323E;
align-self: center;
`;

const ThumbnailStyeld = styled(IonAvatar)`
border-radius: 50%
size: 100px
display: ; 
justify-content: center; 
`;

const RegisterCard = styled(IonCard)`
padding: 20px;
background-color: #5E503F;

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${mountenWave}") no-repeat fixed;
background-size: cover;
background-color: #22333b;
`;

const CenterContainer = styled.div`
display: flex; 
justify-content: center; 
flex-direction: column; 
height: 100%;
`;

const PageTitle = styled.h1`
font-size: 3em; 
align-self: center;
color: #0a0908;
font-family: 'Quicksand', sans-serif;
`;

export default RegisterModal; 