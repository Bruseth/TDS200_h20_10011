import { useAuth } from "react-nhost";
import IComment from "./IComment";
import IImages from "./Images/IImages";

interface IPost {
  id: number;
  title: string;
  description: string;
  image_filename: string;
  user: {
    id: number;
    display_name: string;
    avatar_url: string
  };
  comments?: IComment[];

  images?: IImages[];



  //likes: number;
}

export default IPost;
