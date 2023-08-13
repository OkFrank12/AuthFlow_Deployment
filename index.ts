import express, { Application } from "express";
import dotenv from "dotenv";
import { envVariables } from "./Config/ennVariables";
import { mainApp } from "./mainError";
import { dbConfig } from "./Config/Database";
dotenv.config();

const port: number = parseInt(envVariables.PORT!);
const app: Application = express();
mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("Server is shutting down because of uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Server is shutting down because of unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
