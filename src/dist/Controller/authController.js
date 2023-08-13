"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeOneUser = exports.seeAllUser = exports.signInUser = exports.registerUser = void 0;
const mainError_1 = require("../Error/mainError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const auth = yield authModel_1.default.create({
            name,
            email,
            password: hash,
            avatar: secure_url,
            avatarID: public_id,
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Register User success",
            data: auth,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Register Error",
            message: "This error came as a result of creating a user",
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.registerUser = registerUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const hash = yield bcrypt_1.default.compare(password, user.password);
            if (hash) {
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: `Welcome back ${user.name}`,
                    data: user._id,
                });
            }
            else {
                new mainError_1.mainError({
                    name: "Invalid Password error",
                    message: `This error came as a result of invalid password entry`,
                    status: mainError_1.HTTP.BAD,
                    success: false,
                });
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "User password invalid",
                });
            }
        }
        else {
            new mainError_1.mainError({
                name: "User can't be found",
                message: "This error came as a result of not been registered",
                status: mainError_1.HTTP.BAD,
                success: false,
            });
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Oops!!! User is not found here",
            });
        }
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Signing user error",
            message: `This error came as a result of signin a user`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
        });
    }
});
exports.signInUser = signInUser;
const seeAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "Reading Users Bio",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "User Bios error",
            message: `This error came as a result of viewing users data`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error",
        });
    }
});
exports.seeAllUser = seeAllUser;
const seeOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const user = yield authModel_1.default.findById(authID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "One User Bio",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "One User Bio",
            message: `This error came as a result of viewing one user data`,
            status: mainError_1.HTTP.BAD,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
        });
    }
});
exports.seeOneUser = seeOneUser;
