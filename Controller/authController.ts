import { Request, Response } from "express";
import { HTTP, mainError } from "../Error/mainError";
import bcrypt from "bcrypt";
import authModel from "../Model/authModel";
import cloudinary from "../Utils/cloudinary";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const auth = await authModel.create({
      name,
      email,
      password: hash,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(HTTP.CREATE).json({
      message: "Register User success",
      data: auth,
    });
  } catch (error) {
    new mainError({
      name: "Register Error",
      message: "This error came as a result of creating a user",
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });

    if (user) {
      const hash = await bcrypt.compare(password, user.password);

      if (hash) {
        return res.status(HTTP.CREATE).json({
          message: `Welcome back ${user.name}`,
          data: user._id,
        });
      } else {
        new mainError({
          name: "Invalid Password error",
          message: `This error came as a result of invalid password entry`,
          status: HTTP.BAD,
          success: false,
        });

        return res.status(HTTP.BAD).json({
          message: "User password invalid",
        });
      }
    } else {
      new mainError({
        name: "User can't be found",
        message: "This error came as a result of not been registered",
        status: HTTP.BAD,
        success: false,
      });

      return res.status(HTTP.BAD).json({
        message: "Oops!!! User is not found here",
      });
    }
  } catch (error) {
    new mainError({
      name: "Signing user error",
      message: `This error came as a result of signin a user`,
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};

export const seeAllUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();
    return res.status(HTTP.OK).json({
      message: "Reading Users Bio",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "User Bios error",
      message: `This error came as a result of viewing users data`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error",
    });
  }
};

export const seeOneUser = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const user = await authModel.findById(authID);

    return res.status(HTTP.OK).json({
      message: "One User Bio",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "One User Bio",
      message: `This error came as a result of viewing one user data`,
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};
