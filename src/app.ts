import express from "express";
import { createPcapSession } from "./utils/packetCapture";

const app = express();


const onServerRunning = () =>{
    console.log('Server Running on PORT 3000')
}

createPcapSession();

app.listen(3000, onServerRunning);