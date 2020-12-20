import IImages from "./IImage";

interface IImagesList {
    posts_by_pk: {
        images: IImage[];
    }
}

export default IImagesList;