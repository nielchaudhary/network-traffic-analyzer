import express from "express";

const app = express();


const onServerRunning = () =>{
    console.log('Server Running on PORT 3000')
}



app.listen(3000, onServerRunning);