import IImages from "./IImages";

interface IImagesList {
    posts_by_pk: {
        image: IImages[];
    }
}

export default IImagesList;