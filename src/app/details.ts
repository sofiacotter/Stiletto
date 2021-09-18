export class userDetails {
    uid:string;
    email: string; 
    username: string; 
    profilephoto: string;
    followers: string[];
    following: string[];
    token: string;
} 


export class SearchResults {
    idpost:string;
    imagepath: string; 
} 





export class Comment {
    uid: string;
    username: string;
    imagepath: string;
    comment: string;
    datetime: string;
}



export class PostInfo{
    uid: string;
    idpost: string;
    imagepath: string;
    username: string;
    profilephoto: string;
    description: string;
    hashtags: string;
    datetime: any;
    likes: string[];
    saves: string[];
    comments: Comment[] | null;
}




   