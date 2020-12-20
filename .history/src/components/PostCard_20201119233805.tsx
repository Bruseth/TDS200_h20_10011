import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSlide, IonSlides } from "@ionic/react";
import IPost from "../models/IPost";
import IImages from "../models/IImages"
import styled from "styled-components";
import IComment from "../models/IComment";
import { image } from "ionicons/icons";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_IMAGES = gql`
query getImageByPostID($post_id: Int!) {
posts_by_pk(id: $post_id) {
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

 const PostCard = ({ id, title, description, user, images, comments }: IPost) => {

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };


const { loading, data } = useQuery<IImages>(GET_IMAGES, {
  variables: {
    
  },
  fetchPolicy: "no-cache"
});

console.log(images?[])
console.log(user.display_name)

  

  return (
    <StyledCard>
      <IonSlides pager={true} options={slideOpts}>
        <IonSlide>
          <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${id}`} />
        </IonSlide>
      </IonSlides>
      <IonCardHeader>
        <StyledSubtitle>
        @{user.display_name} &bull;?likes
        </StyledSubtitle>
        <PageTitle>
          {title}
        </PageTitle>
      </IonCardHeader>
      <StyledCardContent>
        {description}
      </StyledCardContent>
      <StyledCardContentDetail>
        {description}
      </StyledCardContentDetail>
      <img src={`https://backend-ck80jrpa.nhost.app/storage/o/public/${images}`} />
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