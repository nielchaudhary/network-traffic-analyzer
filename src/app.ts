import express from "express";
import { latencyManagement } from "./utils/latencyManagement";
import { createPcapSession, getDeviceInventory } from "./utils/deviceInventory";

const app = express();

createPcapSession();
latencyManagement();


app.get('/devices', (req, res) => {
    res.json(getDeviceInventory());
});
app.listen(3000);