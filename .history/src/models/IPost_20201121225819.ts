import { useAuth } from "react-nhost";
import IComment from "./IComment";
import IImages from "./Images/IImages";
const { signedIn } = useAuth();

interface IPost {
  id: number;
  title: string;
  description: string;
  images_filename: string;
  user: {
    id: number;
    display_name: string;
  };
  comments?: IComment[];

  images?: IImages[];



  //likes: number;
}

export default IPost;
