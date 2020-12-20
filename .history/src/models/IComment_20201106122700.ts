interface IComment {
    id: number;
    text: string;
    user: {
        display_name: string;
    };
    
    //date: string;
    //profileImageURL?: string;
}

export default IComment