"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ennVariables_1 = require("./Config/ennVariables");
const mainError_1 = require("./mainError");
const Database_1 = require("./Config/Database");
dotenv_1.default.config();
const port = parseInt(ennVariables_1.envVariables.PORT);
const app = (0, express_1.default)();
(0, mainError_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, Database_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("Server is shutting down because of uncaughtException", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down because of unhandledRejection", reason);
    server.close(() => {
        process.exit(1);
    });
});
