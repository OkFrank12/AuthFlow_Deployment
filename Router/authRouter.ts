import { Router } from "express";
import { Upload } from "../Utils/multer";
import {
  registerUser,
  seeAllUser,
  seeOneUser,
  signInUser,
} from "../Controller/authController";

const auth: Router = Router();

auth.route("/register").post(Upload, registerUser);
auth.route("/sign-in").post(signInUser);
auth.route("/see-all").get(seeAllUser);
auth.route("/:authID/see").get(seeOneUser);

export default auth;
