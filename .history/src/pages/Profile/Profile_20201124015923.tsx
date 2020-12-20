import { useSubscription } from "@apollo/client";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonListHeader, IonAvatar, IonLabel } from "@ionic/react";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IPostList from "../../models/IPostList";




const GET_PROFILE_INFO = gql`
subscription {
  posts (where: {user_id: {_eq: "x-hasura-user-id"}}) {
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


const Profile = () => {
  const { data } = useSubscription<IPostList>(GET_PROFILE_INFO, {
        variables: {
          posts: {
            user: {
              
            }
        }
    fetchPolicy: "no-cache"
  });

  if (loading) { return <IonLabel>loading</IonLabel> }

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
            <IonAvatar key={i}>

              <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${post.user.avatar_url}`} />
              
            </IonAvatar>
          ))}
                <IonHeader>
            
              </IonHeader>
        
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
      

      </IonContentStyled>

    </IonPage >

  );
}







const IonContentStyled = styled(IonContent)`
--background: none;
background-color: #C6AC8F;
`;


export default Profile;
