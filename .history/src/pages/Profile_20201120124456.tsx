import { useMutation } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, IonProgressBar, IonApp, IonListHeader } from "@ionic/react";
import gql from "graphql-tag";
import React, { useState } from "react";
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
    <IonApp>
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>Avatar</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonListHeader>Default</IonListHeader>
      <ion-avatar class="ion-margin-start">
        <img src="./avatar.svg">
      </ion-avatar>

      <ion-list-header>Chip Avatar</ion-list-header>
      <ion-chip class="ion-margin-start">
        <ion-avatar>
          <img src="./avatar.svg">
        </ion-avatar>
        <ion-label>Kit Bishop</ion-label>
      </ion-chip>

      <ion-list>
        <ion-list-header>Item Avatars</ion-list-header>
        <ion-item>
          <ion-avatar slot="start">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>Lorem ipsum</ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>
            <h3>Lorem ipsum</h3>
            <p>dolor sit amet</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>
            <h3>Lorem ipsum</h3>
            <p>dolor sit amet</p>
            <p>consectetur adipiscing elit. Duis ut urna neque.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="end">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>Lorem ipsum</ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="end">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>
            <h3>Lorem ipsum</h3>
            <p>dolor sit amet</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="end">
            <img src="./avatar.svg">
          </ion-avatar>
          <ion-label>
            <h3>Lorem ipsum</h3>
            <p>dolor sit amet</p>
            <p>consectetur adipiscing elit. Duis ut urna neque.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-app>
  );
};



export default Profile;
