import mongoose from "mongoose";

export interface iAuth {
    name: string;
    email: string;
    password: string;
    avatar: string;
    avatarID: string;
  }
  
  export interface iAuthData extends iAuth, mongoose.Document {}