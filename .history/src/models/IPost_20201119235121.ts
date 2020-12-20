import { useAuth } from "react-nhost";
import IComment from "./IComment";
import IImages from "./IImages";
const { signedIn } = useAuth();

interface IPost {
  id: number;
  title: string;
  description: string;
  image_filename: string;
  user: {
    id: number;
    display_name: string;
  };
  comments?: IComment[];

  images? | any : {
    images_filename: string;
  }



  //likes: number;
}

export default IPost;
