import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { HTTP, mainError } from "./Error/mainError";
import { errorHandler } from "./Error/errorBuilder";
import auth from "./Router/authRouter";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    return res.status(HTTP.OK).json({
      message: "Auth Flow is live",
    });
  });

  app.use("/api/v1", auth);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `This is happening because the ${req.originalUrl} isn't valid`,
        status: HTTP.BAD,
        success: false,
      })
    );
  });
  app.use(errorHandler);
};
