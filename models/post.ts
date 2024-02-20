import mongoose from "mongoose";
import { string } from "zod";

const postSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: [String],
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      username: {
        type: String, // username only also
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  image: [String],
});

export const Post = mongoose.model("Post", postSchema);
