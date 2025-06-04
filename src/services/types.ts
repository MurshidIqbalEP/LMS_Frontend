

export interface IUser {
    _id:string;
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
    chapterId?:string;
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
    resources?:string;
    chapters:IChapter[];
    isPublished?:boolean;
    rating?:{userId:string,rating:number}[];
    enrolledStudents:string[]
}
export interface IReview {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  course: string; 
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
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

  export enum LectureStatus {
    NotStarted = "not_started",
    InProgress = "in_progress",
    Completed = "completed"
  }

  export interface ILectureProgress {
    lectureId: string;
    status: LectureStatus;
    completedAt: string | null;
    _id: string;
  }
  
  export interface IChapterProgress {
    chapterId: string;
    isCompleted: boolean;
    completedAt: string | null;
    lecturesProgress: ILectureProgress[];
    _id: string;
  }
  
  export interface IProgressData {
    _id: string;
    userId: string;
    courseId: string;
    isCompleted: boolean;
    completedAt: string | null;
    chapters: IChapterProgress[];
    __v: number;
  }
  
  export interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface IEducator{
 _id: string;
  name: string;
  email?: string;
  courses?:number
}

interface EducatorInfo {
  _id: string;
  name: string;
  email?: string;
}
export type EducatorInfoState = EducatorInfo | null;

export interface MonthlyUserData {
  month: string;      
  students: number;   
}

export interface CourseCategoryData {
  name: string;   
  value: number;  
}