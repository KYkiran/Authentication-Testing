import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.json({"message":"Hello world"});
})

app.listen(PORT, ()=>{
    console.log("Listening on port: " + PORT);
    
})