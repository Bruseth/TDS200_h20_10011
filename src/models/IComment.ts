interface IComment {
    id: number;
    text: string;
    user: {
        display_name: string;
    };
    
    //profileImageURL?: string;
}

export default IComment;