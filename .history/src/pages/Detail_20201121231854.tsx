import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton, IonButton, IonIcon, IonActionSheet, IonTextarea, IonSlides, IonSlide
} from "@ionic/react";
import PostCard from "../components/PostCard";
import IPost from "../models/IPost";
import { gql, useMutation, useQuery } from "@apollo/client";
import { auth } from "../utils/nhost";
import { heart, trash, trashBinOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import ICommentList from "../models/ICommentList";
import styled from "styled-components";
import { useAuth } from "react-nhost";


const GET_COMMENTS = gql`
query getCommentsByPostID($post_id: Int!) {
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

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
  insert_comments_one(object: $comment) {
    post_id
    user_id
    text
  }
}
`;


const DELETE_POST = gql`
  mutation DeletePost($post_id: Int!) {
    delete_comments(
      where: {
        post_id: {
          _eq: $post_id
        }
      }
    ){
      affected_rows
    }
    delete_posts_by_pk (
      id: $post_id
    ) { id }
  }
`;

const DELETE_COMMENT = gql`
mutation DeleteComment($commentID: Int!) {
  delete_comments_by_pk(
    id: $commentID
    ) { id }
  }
`;



const Detail = (props: any) => {
  const post: IPost = props.location?.state?.post;
  const { signedIn } = useAuth();
  let history = useHistory();

  const [text, setText] = useState<string>("");
  const [deletePostMutation] = useMutation(DELETE_POST);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const [insertCommentsMutation] = useMutation(INSERT_COMMENT);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [commentInt, setCommentInt] = useState<number>(Number);


  const { loading, data } = useQuery<ICommentList>(GET_COMMENTS, {
    variables: {
      post_id: post?.id
    },
    fetchPolicy: "no-cache"
  });


  //En midlertidig fix for retunering til home
  if (!post) {
    return <div />;
  }

  if (loading) { return <IonLabel>Laster kommentarer</IonLabel> }

  const insertComment = async () => {
    try {
      await insertCommentsMutation({
        variables: {
          comment: {
            post_id: post?.id,
            user_id: auth.getClaim('x-hasura-user-id'),
            text
          }
        }
      });
      history.replace("/home")
    } catch {
      console.log("Feil")
    }
  }

  const deletePost = async () => {
    try {
      await deletePostMutation({
        variables: {
          post_id: post.id
        }
      })
    } catch (e) {
      console.warn(e);
    }
  }

  //Funksjonalitet for sletting av en kommentar som brukeren eier. deleteComment venter 
  //på id når brukeren trykker på ønsket kommentar før den kan bli slettet. Dette ble løst med ActionSheet
  const deleteComment = async () => {
    const commentId = commentInt
    try {
      await deleteCommentMutation({
        variables: {
          commentID: commentId
        }
      })

    } catch (e) {
      console.warn(e);
    }
  }




  return (
    <IonPage>
      <IonHeader>
        <StyledToolBar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detail</IonTitle>
          {signedIn === true ? (
            post.user.id + "" === auth.getClaim('x-hasura-user-id')  &&
            <IonButtons slot="end">
              <IonButton onClick={deletePost} />
              <IonIcon color="danger" icon={trashBinOutline} />
            </IonButtons>
          
          }
        </StyledToolBar>
      </IonHeader>
      <IonContentStyled>
        <PostCard {...post} />
        <IonCard>
          <StyledList>
            {
              data?.posts_by_pk.comments?.map((comment, i) => (
                <StyledItem key={i}>
                  <IonLabel>
                    <h2>{comment.user.display_name}</h2>
                    <p>{comment.text}</p>
                  </IonLabel>
                  {
                    post.user.id + "" === auth.getClaim('x-hasura-user-id') &&
                    <IonButton onClick={() => { setShowActionSheet(true); setCommentInt(comment.id) }} expand="block" color="light">
                      ...
                    </IonButton>
                  }
                  <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='my-custom-class'
                    buttons={
                      [{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: deleteComment
                      },
                      {
                        text: 'Favorite',
                        icon: heart,
                        handler: () => {
                          console.log('Favorite clicked');
                        }
                      }, {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                        }
                      }]}
                  >
                  </IonActionSheet>
                </StyledItem>
              ))}
          </StyledList>
        </IonCard>
        <IonCard color="danger">
          <StyledList lines="none" >
            <StyledItem>
              <IonTextarea color="light" placeholder="Skriv kommentar" onIonInput={(e: any) => setText(e.target.value)} />
            </StyledItem>
            <IonButton color="light" shape="round" expand="block" onClick={insertComment}>Legg til kommentar</IonButton>
          </StyledList>
        </IonCard>
      </IonContentStyled>
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
--background: none;
background-color: #22333b;
`;

const StyledList = styled(IonList)`
background-color: #C6AC8F;
`;

const StyledItem = styled(IonItem)`
--background: none;
background-color: #C6AC8F;
`;

const StyledToolBar = styled(IonToolbar)`
--background: none;
background-color: #22333B;
`;



export default Detail;

