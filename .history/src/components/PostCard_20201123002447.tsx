import React, { useState } from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSlide, IonSlides, IonButton } from "@ionic/react";
import IPost from "../models/IPost";
import IImages from "../models/Images/IImages"
import styled from "styled-components";
import IComment from "../models/IComment";
import { image, images } from "ionicons/icons";
import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import IImagesList from "../models/Images/IImagesList";


const GET_IMAGES = gql`
subscription getCommentsByPostID($post_id: Int!) {
  posts_by_pk(id: $post_id) {
    images {
      id
      images_filename
      display_name
    }
  }
}
`;


const PostCard = ({ id, title, description, user }: IPost) => {

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  const { loading, data } = useSubscription<IImagesList>(GET_IMAGES, {
    variables: {
      post_id: id
    },
    fetchPolicy: "no-cache"
  });


  const [showText, setShowText] = useState<Boolean>(false)

 

  return (
    <StyledCard>
      <IonSlides pager={true} options={slideOpts}>
        {
          data?.posts_by_pk?.images.map((image, i) => (
              <IonSlide key={i}>
                <IonCard>
                  <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${image.images_filename}`} />
                </IonCard>
              </IonSlide>
           ))}
      </IonSlides>
      <IonCardHeader>
      {
          data?.posts_by_pk?.images.map((image, i) => (
        <StyledSubtitle>
          @{image} &bull;?likes
        </StyledSubtitle>
          ))}
      
     
        <PageTitle>
          {title}
        </PageTitle>
      </IonCardHeader>
      {!showText ? (
        <StyledCardContent>
          {description}
        </StyledCardContent>
      ) : (
          <StyledCardContentDetail>
            {description}
          </StyledCardContentDetail>
        )}
        <IonButton  fill="clear" size="small" onClick={() => setShowText(true)} >
          Vis mer
        </IonButton>
    </StyledCard>
  );
}


const StyledCard = styled(IonCard)`
padding: 20px;
background-color: #EAE0D5;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;

const PageTitle = styled(IonCardTitle)`
color: #0a0908;
font-family: 'Quicksand', sans-serif;
`;

const StyledSubtitle = styled(IonCardSubtitle)`
display: flex; 
--color: #0a0908;

`;

//Begrenser hvor mye tekst
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

//Legg til skygge på kortet

export default PostCard;