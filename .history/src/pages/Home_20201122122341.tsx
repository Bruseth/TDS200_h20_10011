// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonLabel, IonIcon
} from '@ionic/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PostCard from '../components/PostCard';
import { useQuery, useSubscription } from "@apollo/client"
import gql from "graphql-tag";
import IPostList from '../models/IPostList';
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server";
import MountenWave from "../components/WaveBlob2";
import { exitOutline } from 'ionicons/icons';
import { auth } from '../utils/nhost';
import { useAuth } from 'react-nhost';

const mountenWave = encodeURIComponent(renderToStaticMarkup(<MountenWave />));


const GET_POSTS = gql`
subscription  {
    posts {
      id
      title
      description
      image_filename
      user {
        id
        display_name
      }
      comments {
      id
      text
      user {
        display_name
      }
    }
      images {
        images_filename
    }
  }
}
`;


const Home = () => {

  const { signedIn } = useAuth();
  let history = useHistory();
  const { loading, data } = useSubscription<IPostList>(GET_POSTS);


  if (loading) {
    return <IonLabel>Laster...</IonLabel>
  }

  const logout = async () => {
    try {
      await auth.logout();
      history.replace("/login");
    } catch (e) {
      console.log(e);
      console.log()

    }
  }

  return (
    <IonPage>
      <IonHeader>
        <StyledToolBar>
          {
            signedIn &&
            <IonButtons slot="start">
              <IonButton onClick={logout}>
                <IonIcon icon={exitOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          }

          <IonTitle>MinTur</IonTitle>        
        </StyledToolBar >
      </IonHeader>
      <IonContentStyled fullscreen>
        {
          !data ? (
            "No posts"
          ) : (
              data?.posts.map(post => (
                <Link style={{ textDecoration: 'none' }} key={post.id} to={{
                  pathname: `/detail/${post.id}`,
                  state: {
                    post
                  }
                }}>
                  <PostCard {...post} />
                </Link>
              ))
            )
        }
      </IonContentStyled>
    </IonPage>
  );
};


const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${mountenWave}") no-repeat fixed;
background-size: cover;
background-color: #22333b;
`;

const StyledToolBar = styled(IonToolbar)`
--background: none;
background-color: #22333B;
`;

/*
const StyledCardContent = styled()`
display: flex; 
color: #0a0908;
display: block;
text-overflow: ellipsis;
word-wrap: break-word;
overflow: hidden;
max-height: 3.6em;
line-height: 1.8em;
`;
*/

export default Home;
