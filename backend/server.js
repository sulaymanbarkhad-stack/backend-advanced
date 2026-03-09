import express from "express";
import dotenv from "dotenv";
import { Connected } from "./config/db.js";
import userRouter from "./routes/user.js";



dotenv.config();

const app = express();

Connected();

app.use(express.json());

app.use("/api/auth", userRouter);




const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log("server is now running on port", port);
    
})


