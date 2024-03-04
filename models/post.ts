import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
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
  image: {
    type: String,
    default: "",
  },
});

export const Post = mongoose.model("Post", postSchema);
