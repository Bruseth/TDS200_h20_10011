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

const useImageUpload = () => {

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startUploading = async ({ base64String, filenameWithExtension }: { base64String: string, filenameWithExtension: string }) => {

    await storage.putString(`/public/${filenameWithExtension}`, base64String, "data_url", null, (pe: ProgressEvent) => {
      setUploadProgress((pe.loaded / pe.total) * 100);
      //Clear progress
      setTimeout(() => setUploadProgress(0), 10000);
    });
  }

  return {
    startUploading,
    uploadProgress
  }
}

const Profile = () => {

  const { photo, getPhoto } = useCamera();
  const { startUploading, uploadProgress } = useImageUpload();
  const [insertPostMutation] = useMutation(INSERT_POST);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [filename, setFilename] = useState<string>("");


  const triggerCamera = async () => {
    await getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 20,
      allowEditing: false
    });
    setFilename(`${Date.now().toString()}.jpeg`)
  }

  const uploadImage = async () => {
    if (photo?.dataUrl) {
      await startUploading({
        base64String: photo.dataUrl,
        filenameWithExtension: filename
      })
    } else {
      alert("Du må ta et bilde");
    }
  }

  const insertPost = async () => {
    try {
      await insertPostMutation({
        variables: {
          //post gjenspeiles til $post i INSERT_POST
          post: {
            title,
            description,
            image_filename: filename,
            user_id: auth.getClaim('x-hasura-user-id')
          }
        }
      });
    } catch (e) {
      console.log("Feil")
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Nytt innlegg</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img src={photo?.dataUrl} />
          <IonList>
            <IonItem>
              <IonInput placeholder="Tittel" onIonInput={(e: any) => setTitle(e.target.value)} />
            </IonItem>
            <IonItem>
              <IonInput placeholder="Beskrivelse" onIonInput={(e: any) => setDescription(e.target.value)} />
            </IonItem>
          </IonList>
          <IonButton onClick={triggerCamera}>Ta bilde</IonButton>
          <IonButton onClick={uploadImage}>Last opp bilde({filename})</IonButton>
          <IonButton onClick={insertPost}>Send post</IonButton>
          <IonProgressBar value={uploadProgress}></IonProgressBar>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};



export default Profile;
