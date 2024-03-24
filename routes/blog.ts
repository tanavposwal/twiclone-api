import express, { Request, Response, Router } from "express";
import { z } from "zod";
import { Post } from "../models/post";
import { authenticateJwt } from "../jwt/auth";
import ShortUniqueId from "short-unique-id";
const router: Router = express.Router();

// retrieve all post
router.get("/", async (req: Request, res: Response) => {
  const projection = {content: 1, username: 1, comments: {$size: { $ifNull: ['$comments', []] }}, likes: {$size: { $ifNull: ['$likes', []] }}, timestamp: 1, hash: 1, image: 1, share: 1, _id: 0}

  const post = await Post.find({}, projection);
  res.json({ success: true, post });
});

const PostSchema = z.object({
  content: z.string().max(280),
  image: z.string().url(),
});

// create new post
router.post("/create", authenticateJwt, (req: Request, res: Response) => {
  let parsedInput = PostSchema.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(403).json({
      msg: "error",
    });
  }
  const { content, image } = parsedInput.data;
  const authorName = req.headers["userName"];
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const newPost = new Post({
    content,
    image,
    username: authorName,
    hash: randomUUID(),
    date: Date.now(),
  });
  newPost
    .save()
    .then(() => {
      res.json({ success: true, msg: "Created post" });
    })
    .catch((err: Error) => {
      res.json({ success: false, msg: "Failed to create new post", err });
    });
});

// view saved post
router.get("/:hash", async (req: Request, res: Response) => {
  const blogId: string = req.params.hash;
  const post = await Post.findOne({ hash: blogId });
  if (post) {
    res.json({
      success: true,
      post: {
        author: post.username,
        content: post.content,
        time: post.timestamp,
        likes: post.likes.length,
        comments: post.comments.length,
        shares: post.shares,
        image: post.image,
      },
    });
  } else {
    res.json({ success: false, msg: "Post not found" });
  }
});

// TODO: make endpoint to edit post
// (/hash/edit)

router.post(
  "/:hash/delete",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const blogId: string = req.params.hash;
    const authorName: any = req.headers["userName"];
    const post = await Post.findOne({ hash: blogId });

    if (post && post.username == authorName) {
      await Post.findOneAndDelete({ hash: blogId });
      res.json({ success: true, msg: "Post deleted" });
    } else {
      res.json({ success: false, msg: "Post not found or privilage denied" });
    }
  }
);

const CommentSchema = z.object({
  content: z.string().max(100),
});

// comment on saved post
router.post(
  "/:hash/comments/create",
  authenticateJwt,
  async (req: Request, res: Response) => {
    let parsedInput = CommentSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error",
      });
    }
    const { content } = parsedInput.data;
    const userName = req.headers["userName"];
    const blogId: string = req.params.hash;
    const post = await Post.findOne({ hash: blogId });
    if (post) {
      post.comments.push({
        content,
        username: userName,
        timestamp: Date.now(),
      });
      await post.save();
      res.json({ success: true, msg: "Comment posted" });
    } else {
      res.json({ success: false, msg: "Post not found" });
    }
  }
);

// TODO: endpoints to edit comment, delete comment
// (/comment/edit, /comment/delete)

router.get(
  "/:hash/comments",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const blogId: string = req.params.hash;

    const post = await Post.findOne({ hash: blogId });
    if (post) {
      res.json({ success: true, comments: post.comments });
    } else {
      res.json({ success: false, msg: "Post not found" });
    }
  }
);

// like or dislike a saved post
router.get(
  "/:hash/like",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const blogId: string = req.params.hash;
    const userName: any = req.headers["userName"];
    const post = await Post.findOne({ hash: blogId });
    
    if (post) {
      const userLikedIndex = post.likes.indexOf(userName);

      if (userLikedIndex === -1) {
        post.likes.push(userName);
        await post.save()
        res.json({ success: true, msg: "Post liked" });
      } else {
        post.likes.splice(userLikedIndex, 1);
        await post.save()
        res.json({ success: true, msg: "Post disliked" });
      }
    }
  }
);

// TODO: endpoint for searching use algolia
// (/query)

export default router;
