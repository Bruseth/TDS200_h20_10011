import IImages from "./IImages";

interface IImagesList {
    posts_by_pk: {
        images: IImages[];
    }
}

export default IImagesList;