"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const ennVariables_1 = require("../Config/ennVariables");
cloudinary_1.v2.config({
    cloud_name: ennVariables_1.envVariables.CLOUD_NAME,
    api_key: ennVariables_1.envVariables.CLOUD_KEY,
    api_secret: ennVariables_1.envVariables.CLOUD_SECRET,
    secure: true,
});
exports.default = cloudinary_1.v2;
