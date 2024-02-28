import express, { Request, Response } from "express";
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL ?? "your url here";
mongoose.connect(mongodbUrl);

import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user";

const app = express();
const port = 3000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Throttling middleware
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests before starting to delay responses
  delayMs: 500, // add 500ms delay per request above 100 requests
  message: "Too many requests, please try again later",
});

// Apply the middleware globally
app.use(limiter);
app.use(speedLimiter);

app.use(cors());
app.use(express.json());

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
