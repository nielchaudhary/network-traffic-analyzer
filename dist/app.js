"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const latencyManagement_1 = require("./utils/latencyManagement");
const deviceInventory_1 = require("./utils/deviceInventory");
const app = (0, express_1.default)();
(0, deviceInventory_1.createPcapSession)();
(0, latencyManagement_1.latencyManagement)();
app.get('/devices', (req, res) => {
    res.json((0, deviceInventory_1.getDeviceInventory)());
});
app.listen(3000);
