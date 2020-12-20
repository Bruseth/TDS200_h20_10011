import { useSubscription } from "@apollo/client";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonAvatar, IonSlide, IonSlides, IonCardContent, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import gql from "graphql-tag";
import React from "react";
import { useAuth } from "react-nhost";
import styled from "styled-components";
import IImagesList from "../../models/Images/IImagesList";
import IPost from "../../models/IPost";




const GET_IMAGES = gql`
subscription getCommentsByPostID($post_id: Int!) {
  posts_by_pk(id: $post_id) {
    images {
      id
      images_filename
    }
  }
}


`;




const ProfileGalleri = (props: any) => {
  const post: IPost = props.location?.state?.post;

  const { data } = useSubscription<IImagesList>(GET_IMAGES, {
    variables: {
      post_id: post?.id
    },
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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
            <IonTitle>Min Profil</IonTitle>
          </IonToolbar >
        </IonHeader>
        <IonContentStyled fullscreen>

          <IonSlides pager={true} options={slideOpts}>
            {
              data?.posts_by_pk?.images.map((images, i) => (
            
                  <IonSlide key={i}>
                    <IonCard>
                      <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${images.images_filename}`} />
                    
                    </IonCard>
                  </IonSlide>
              ))}
          </IonSlides>
        </IonContentStyled>
 
    </IonPage >

  );
}







const IonContentStyled = styled(IonContent)`
--background: none;
background-color: #C6AC8F;
`;


export default ProfileGalleri;
