import { IonPage, IonList, IonItem, IonInput, IonButton, IonToast, IonCard, IonContent, useIonViewWillEnter, IonToolbar, IonButtons, IonBackButton, IonHeader, IonIcon, IonAvatar, IonThumbnail, IonModal } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../utils/nhost";
import WaveBlob from "../components/WaveBlob";
import { renderToStaticMarkup } from "react-dom/server";
import { useHistory } from "react-router";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { useImageUpload } from "../utils/hooks/usePhotoUpload";
import { cameraOutline } from "ionicons/icons";
import { CameraResultType } from "@capacitor/core";
import { Icon } from "ionicons/dist/types/components/icon/icon";
import Login from "./Login"
const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));



const RegisterUser: React.FC<any> = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState({isOpen: false});
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
    <IonModal isOpen={onClose}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/login" />
            </IonButtons>
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

            <LoginCard>

              <IonList>
                <IonItem>
                  <IonInput placeholder="Nytt brukernavn" onIonInput={(e: any) => setUserName(e.target.value)} />
                </IonItem>
                <IonItem>
                  <IonInput placeholder="Ny E-post" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
                </IonItem>
                <IonItem>
                  <IonInput placeholder="Nytt Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
                </IonItem>

              </IonList>
            </LoginCard>
            <IonButton onClick={registerUser}>
              Register</IonButton>

              <IonButton onClick={onClose}>Lukk</IonButton>
          </CenterContainer>

          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={() => setShowErrorToast(false)}
            message="Bruker ekister allerede/mangler passord"
            duration={3000}
            color="warning"
          />
        </IonContentStyled>
      </IonPage>
    </IonModal>
  )
};


const ThumbnailStyeld = styled(IonThumbnail)`
border-radius: 50%
--size: 100px

`;

const LoginCard = styled(IonCard)`
padding: 20px;
background-color: white;

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${waveBlobString}") no-repeat fixed;
background-size: cover;
background-color: white;
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
color: #37323E;
font-family: 'Quicksand', sans-serif;
`;

export default RegisterUser; 