import mongoose from "mongoose";
import { envVariables } from "./ennVariables";

const local: string = envVariables.CLOUD!;

export const dbConfig = () => {
  mongoose.connect(local).then(() => {
    console.log("Connected");
  });
};
