import { useSubscription } from "@apollo/client";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonList, IonItem, IonListHeader, IonAvatar, IonLabel, IonCardHeader, IonSlide, IonSlides, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import userEvent from "@testing-library/user-event";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useAuth } from "react-nhost";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IPost from "../../models/IPost";
import IPostList from "../../models/IPostList";




const GET_PROFILE_INFO = gql`
subscription {
  posts (where: {user_id: {_eq: "f95ee023-dcd4-40e8-8f52-fdbf45ea1a3e"}}) {
    id
    description
    title
    image_filename
    user {
      display_name
      avatar_url
    }
    comments {
      id
      text
      user {
        display_name
      }
    }
  }
}

`;


const Profile = (props: any) => {
  const [] = useState<string>("");
  const { data } = useSubscription<IPostList>(GET_PROFILE_INFO, {
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Min Profil</IonTitle>
        </IonToolbar >
      </IonHeader>
      <IonContentStyled fullscreen>
      {
            data?.posts.map((post, i) => (
              <>
        <IonAvatar key={i}>
          
          <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${post.user.avatar_url}`}/>
         
        </IonAvatar>
            <IonTitle>{}</IonTitle>
        </>
          ))}
        <IonContent>
          <IonListHeader>
            Dine turer
            </IonListHeader>
          {
            data?.posts.map((post => (
              <Link style={{ textDecoration: 'none' }} key={post.id} to={{
                pathname: `/profilegalleri/${post.id}`,
                state: {
                  post
                }
              }}>
                <IonList>
                  <IonItem detail>
                    <IonLabel>{post.title}</IonLabel>
                  </IonItem>
                </IonList>
              </Link>
            ))
            )
          }
        </IonContent>
      </IonContentStyled>

    </IonPage >

  );
}







const IonContentStyled = styled(IonContent)`
--background: none;
background-color: #C6AC8F;
`;


export default Profile;
