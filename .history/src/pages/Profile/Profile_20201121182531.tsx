import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, IonProgressBar, IonApp, IonListHeader, IonAvatar, IonChip, IonLabel, IonCardHeader, IonSlide, IonSlides, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import gql from "graphql-tag";
import { images } from "ionicons/icons";
import React, { useState } from "react";
import { useAuth } from "react-nhost";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCard from "../../components/PostCard";
import IPost from "../../models/IPost";
import IPostList from "../../models/IPostList";
import Slides from "../Slides";


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


const Profile = (props: any) => {
  const post: IPost = props.location?.state?.post;
  const { signedIn } = useAuth();
  const [filename, setFilename] = useState<string>("");
  const { loading, data } = useQuery<IPostList>(GET_PROFILE_INFO, {
    /*
        variables: {
          posts: {
            description: post?.description,
            title: post?.title,
            images_filename: post?.image_filename,
            user: {
              display_name: post?.user.display_name
            }
          }
        },*/
    fetchPolicy: "no-cache"
  });



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
              data?.posts.map((post, i) => (
                <>
                  <IonSlide>
                    <IonCard key={i}>
                      <IonCardHeader>
                        <IonCardTitle>
                          {post.title}
                        </IonCardTitle>
                  
                      </IonCardHeader>
                    </IonCard>
                  </IonSlide>
                </>
              ))}
          </IonSlides>
          <IonContent>
            <IonListHeader>
              Dine turer
            </IonListHeader>
            {
              data?.posts.map((post, i) => (
                <IonList>
                  <IonItem button onClick={() => { <Link style={{ textDecoration: 'none' }} key={i} to={{
                  pathname: `/profilegalleri/${post.id}`,
                  state: {
                    post
                  }
                }}>} detail>
                </Link>}
                    <IonLabel>{post.title}</IonLabel>
                  </IonItem>
                </IonList>
              ))}
          </IonContent>

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

export default Profile;
