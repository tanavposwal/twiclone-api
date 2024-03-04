import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL ?? "your url here";
mongoose.connect(mongodbUrl);

const app = express();
const port = 3001

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user";

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/user", userRoutes);
app.use("/post", blogRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
