"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ennVariables_1 = require("./ennVariables");
const local = ennVariables_1.envVariables.CLOUD;
const dbConfig = () => {
    mongoose_1.default.connect(local).then(() => {
        console.log("Connected");
    });
};
exports.dbConfig = dbConfig;
