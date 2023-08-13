"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mainError_1 = require("./Error/mainError");
const errorBuilder_1 = require("./Error/errorBuilder");
const authRouter_1 = __importDefault(require("./Router/authRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }));
    app.get("/", (req, res) => {
        return res.status(mainError_1.HTTP.OK).json({
            message: "Auth Flow is live",
        });
    });
    app.use("/api/v1", authRouter_1.default);
    app.all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Router Error",
            message: `This is happening because the ${req.originalUrl} isn't valid`,
            status: mainError_1.HTTP.BAD,
            success: false,
        }));
    });
    app.use(errorBuilder_1.errorHandler);
};
exports.mainApp = mainApp;
