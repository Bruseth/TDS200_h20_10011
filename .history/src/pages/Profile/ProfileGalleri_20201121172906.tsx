import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, IonProgressBar, IonApp, IonListHeader, IonAvatar, IonChip, IonLabel, IonCardHeader, IonSlide, IonSlides, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import gql from "graphql-tag";
import { images } from "ionicons/icons";
import React, { useState } from "react";
import { useAuth } from "react-nhost";
import styled from "styled-components";
import PostCard from "../../components/PostCard";
import IImagesList from "../../models/Images/IImagesList";
import IPost from "../../models/IPost";
import IPostList from "../../models/IPostList";
import Slides from "../Slides";



const GET_IMAGES = gql`
query getImagesByPostID($post_id: Int!) {
  images_by_pk(id: $post_id) {
    images_filename
  }
}
`;


const GET_PROFILE_INFO = gql`
query {
  posts (where: {user_id: {_eq: "f95ee023-dcd4-40e8-8f52-fdbf45ea1a3e"}}) {
    description
    title
    image_filename
    user {
      display_name
    }
  }
}

`;


const ProfileGalleri = (props: any) => {
  const post: IPost = props.location?.state?.post;
  const { signedIn } = useAuth();

  const { loading, data } = useQuery<IImagesList>(GET_IMAGES, {
    variables: {
      post_id: 10
    },
    fetchPolicy: "no-cache"
  });

  console.log(post.images[])

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };



  return (

    <IonPage>

      <React.Fragment>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Min Profil</IonTitle>
          </IonToolbar >
        </IonHeader>
        <IonContentStyled fullscreen>

          <IonSlides pager={true} options={slideOpts}>
            {
              data?.posts_by_pk?.images.map((images, i) => (
                <>
                  <IonSlide>

                    <IonCard key={i}>
                      <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${images.images_filename}`} />
                      {console.log(images)}
                    </IonCard>
                  </IonSlide>
                </>
              ))}
          </IonSlides>
        </IonContentStyled>
      </React.Fragment>
    </IonPage >

  );
}


const PageTitle = styled(IonCardTitle)`
color: #0a0908;
font-family: 'Quicksand', sans-serif;
`;

const StyledCardContentDetail = styled(IonCardContent)`
display: flex; 
color: #0a0908;
`;

const StyledCardContent = styled(IonCardContent)`
display: flex; 
color: #0a0908;
display: block;
text-overflow: ellipsis;
word-wrap: break-word;
overflow: hidden;
max-height: 3.6em;
line-height: 1.8em;
`;

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
background-color: #C6AC8F;
`;

const IonAvatarStyled = styled(IonAvatar)`
--border-radius: 20px	

`;

export default ProfileGalleri;
