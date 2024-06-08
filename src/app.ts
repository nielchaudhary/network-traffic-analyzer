import express from "express";
import { createPcapSession } from "./utils/packetCapture";

const app = express();

createPcapSession();

app.listen(3000);