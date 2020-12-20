import { IonSlide, IonSlides, IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonProgressBar, IonTitle, IonToolbar, IonImg } from "@ionic/react";
import React, { useState } from "react";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { auth, storage } from "../utils/nhost";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useImageUpload } from "../utils/hooks/usePhotoUpload"
import { useHistory } from "react-router";
import IImage from "../models/Images/IImages";
import { usePhotoGallery } from "../";

const INSERT_POST = gql`
mutation InsertPost($post: posts_insert_input!) {
  insert_posts_one(object: $post) {
    title
    user_id
    description
    images {
      user_id
      images_filename
    }
  }
}
`;
export interface Photo {
  filepath: string;
  webviewPath?: string;
} 


const NewPost = () => {
  let history = useHistory();
  const { photo, getPhoto } = useCamera();
  const { startUploading, uploadProgress } = useImageUpload();
  const [insertPostMutation] = useMutation(INSERT_POST);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [filename, setFilename] = useState<any>([]);
  
  

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  const triggerCamera = async () => {
    await getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 20,
      allowEditing: false,
      saveToGallery: true
      
    });

    setFilename([...filename, {
      images_filename: `${Date.now().toString()}.jpeg`,
      user_id: auth.getClaim('x-hasura-user-id')
    }])
  }

  const insertPost = async () => {
    if (photo?.dataUrl) {
      for (let i = 0; i< filename.length; i++) {
        await startUploading([{
          base64String: photo?.dataUrl,
          filenameWithExtension: filename[i].images_filename!
        }])
      }
    }
    try {
      await insertPostMutation({
        variables: {
          //post gjenspeiles til $post i INSERT_POST
          post: {
            title,
            description,
            user_id: auth.getClaim('x-hasura-user-id'),
            images: {
              data: filename
            }
          }
        }
      })
      history.replace("/home");
    } catch (e) {
      console.log(e)
    }
  }

  const gallery = [
    photo?.dataUrl
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Nytt innlegg</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
              <IonImg src={photo?.dataUrl} />
            </IonSlide>
          </IonSlides>
          <IonList>
            <IonItem>
              <IonInput placeholder="Tittel" onIonInput={(e: any) => setTitle(e.target.value)} />
            </IonItem>
            <IonItem>
              <IonInput placeholder="Beskrivelse" onIonInput={(e: any) => setDescription(e.target.value)} />
            </IonItem>
          </IonList>
          <IonButton onClick={triggerCamera}>Ta bilde</IonButton>
          <IonButton onClick={insertPost}>Send post</IonButton>
          <IonProgressBar value={uploadProgress}></IonProgressBar>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};



export default NewPost;
