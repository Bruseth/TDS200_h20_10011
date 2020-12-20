import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, IonProgressBar, IonApp, IonListHeader, IonAvatar, IonChip, IonLabel, IonCardHeader, IonSlide, IonSlides, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import gql from "graphql-tag";
import { images } from "ionicons/icons";
import React, { useState } from "react";
import styled from "styled-components";
import IPost from "../models/IPost";
import IPostList from "../models/IPostList";
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

const GET_PROFILE_INFO = gql`
query  {
  posts(where: {user_id: {_eq: "f95ee023-dcd4-40e8-8f52-fdbf45ea1a3e"}}) {
    user {
      display_name
      avatar_url
    }
    images {
      images_filename
    }
    description
    title
  }
}

`;


const Profile = (props: any ) => {


  const [filename, setFilename] = useState<string>("");
  const { loading, data } = useQuery<IPostList>(GET_PROFILE_INFO);





  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };



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
          
            </IonSlide>
          </IonSlides>
          <IonCardHeader>
            <StyledSubtitle>
              {data?.posts.map((posts) =>{
                return <li key={posts.id}>{posts.title}</li>
              })}
            </StyledSubtitle>
            <PageTitle>
              {}
            </PageTitle>
          </IonCardHeader>
          <StyledCardContent>
            {}
          </StyledCardContent>
          <StyledCardContentDetail>
            <ul>
              {data?.posts.map((post) => {
                return <li key={post.id}>{post.description}</li>;
              })}
            </ul>
          </StyledCardContentDetail>
        </StyledCard>
      </IonContentStyled>
    </IonPage>

  );
};

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

export default Profile;
