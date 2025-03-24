

export interface IUser {
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
    isAdmin: boolean;
    image:string;
}

export interface ILecture{
    _id?: string;
    title: string;
    videoUrl?: string;
    duration?: string;
    ispreview?: string;
    position?:number
}

export interface IChapter{
    _id:string;
    courseId?:string;
    title:string;
    lectures:ILecture[];
    position?:number
}

export interface ICourse{
    _id?:string,
    title:string;
    description:string;
    educatorId:{name:string,profilePicture:string,_id?:string};
    category:string;
    price:number;
    thumbnail:string;
    resources?:string[];
    chapters:IChapter[];
    isPublished?:boolean;
    rating?:{userId:string,rating:number}[];
    enrolledStudents:string[]
}

export interface Rating {
    userId: string;
    rating: number;
  };

  export interface IUserInfo {
    _id: string;
    name: string;
    email: string;
  }