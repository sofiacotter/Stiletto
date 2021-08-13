export class userDetails {
    uid:string;
    email: string; 
    username: string; 
    profilephoto: string;
} 


export class SearchResults {
    idpost:string;
    imagepath: string; 
} 


export class PostInfo{
    uid: string;
    idpost: string;
    imagepath: string;
    username: string;
    profilephoto: string;
    description: string;
    hashtags: string;
    datetime: string;
}






export class CommentsResults{
    username: string;
    imagepath: string;
    comment: string;
    datetime: string;
}











export class TimelinePost{
  uid: string;
  idpost: string;
  username: string;
  profilephoto: string;
  imagepath: string;
  description: string;
  hashtags: string;
  datetime: string;
  ncommented: number;
  nlikes: number;
  nsaves: number;
  isSaved: boolean;
  isLiked: boolean;
}

   