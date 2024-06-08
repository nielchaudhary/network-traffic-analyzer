import express from "express";
import { pcapSesh } from "./utils/packetCapture";

const app = express();


const onServerRunning = () =>{
    console.log('Server Running on PORT 3000')
}

pcapSesh();


app.listen(3000, onServerRunning);