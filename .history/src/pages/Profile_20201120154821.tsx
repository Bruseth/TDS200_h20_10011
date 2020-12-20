import { useMutation } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, IonProgressBar, IonApp, IonListHeader, IonAvatar, IonChip, IonLabel, IonCardHeader, IonSlide, IonSlides } from "@ionic/react";
import gql from "graphql-tag";
import { images } from "ionicons/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { storage, auth } from "../utils/nhost";

const INSERT_POST = gql`
mutation InsertPost($post: posts_insert_input!) {
  insert_posts_one(object: $post) {
    title,
    user_id,
    description,
    image_filename
  }
}
`;

const useImageUpload = () => {

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startUploading = async ({ base64String, filenameWithExtension }: { base64String: string, filenameWithExtension: string }) => {

    await storage.putString(`/public/${filenameWithExtension}`, base64String, "data_url", null, (pe: ProgressEvent) => {
      setUploadProgress((pe.loaded / pe.total) * 100);
      //Clear progress
      setTimeout(() => setUploadProgress(0), 10000);
    });
  }

  return {
    startUploading,
    uploadProgress
  }
}

const Profile = () => {

  const { photo, getPhoto } = useCamera();
  const { startUploading, uploadProgress } = useImageUpload();
  const [insertPostMutation] = useMutation(INSERT_POST);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [filename, setFilename] = useState<string>("");


  const triggerCamera = async () => {
    await getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 20,
      allowEditing: false
    });
    setFilename(`${Date.now().toString()}.jpeg`)
  }

  const uploadImage = async () => {
    if (photo?.dataUrl) {
      await startUploading({
        base64String: photo.dataUrl,
        filenameWithExtension: filename
      })
    } else {
      alert("Du må ta et bilde");
    }
  }

  const insertPost = async () => {
    try {
      await insertPostMutation({
        variables: {
          //post gjenspeiles til $post i INSERT_POST
          post: {
            title,
            description,
            image_filename: filename,
            user_id: auth.getClaim('x-hasura-user-id')
          }
        }
      });
    } catch (e) {
      console.log("Feil")
    }
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Din Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContentStyled>
        <StyledCard>
          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
              <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${id}`} />
            </IonSlide>
          </IonSlides>
          <IonCardHeader>
            <StyledSubtitle>
              @{user.display_name} &bull;?likes
        </StyledSubtitle>
            <PageTitle>
              {title}
            </PageTitle>
          </IonCardHeader>
          <StyledCardContent>
            {description}
          </StyledCardContent>
          <StyledCardContentDetail>
            {description}
          </StyledCardContentDetail>
          <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${images}`} />
        </StyledCard>
        </IonContentStyled>
    </IonPage>

  );
};



const StyledSubtitle = styled(IonCardSubtitle)`
display: flex; 
--color: #0a0908;

`;

const StyledCard = styled(IonCard)`
padding: 20px;
background-color: #EAE0D5;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background-color: #EAE0D5;
`;

const IonAvatarStyled = styled(IonAvatar)`
--border-radius: 20px	

`;

export default Profile;
