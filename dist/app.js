"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packetCapture_1 = require("./utils/packetCapture");
const app = (0, express_1.default)();
const onServerRunning = () => {
    console.log('Server Running on PORT 3000');
};
(0, packetCapture_1.pcapSesh)();
app.listen(3000, onServerRunning);
