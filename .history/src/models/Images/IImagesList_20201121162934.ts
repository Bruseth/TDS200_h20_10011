import IImage from "./IImages";
import IImages from "./IImages";

interface IImagesList {
    posts_by_pk: {
        images: IImage[];
    }
}

export default IImagesList;