import express from "express";
import projectrouter from "./routes/projects.route.js";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/project", projectrouter);


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port no: ", PORT);
});



