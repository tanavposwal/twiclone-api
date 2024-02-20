import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import cors from "cors";
require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URL ?? "your url here";
mongoose.connect(mongodbUrl);

import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Define a route handler for the root path
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

// Start the Express server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
