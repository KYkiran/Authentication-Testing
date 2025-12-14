import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./lib/connectMongoDb.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})