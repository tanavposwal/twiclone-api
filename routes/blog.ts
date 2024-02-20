import express, { Request, Response, Router } from 'express';
import { Post } from "../models/post"
import { authenticateJwt } from '../jwt/auth';
import ShortUniqueId from "short-unique-id"
const router: Router = express.Router();

// create new post
router.post('/new', authenticateJwt, (req: Request, res: Response) => {
    const { content, image } = req.body;
    // TODO: zod
    const authorID = req.headers["userId"];
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const newPost = new Post({ content, image, authorID, hash: randomUUID(), date: Date.now() });
  
    newPost.save()
      .then(() => {
        res.json({ success: true, msg: 'Created post' });
      })
      .catch((err) => {
        res.json({ success: false, msg: 'Failed to create new post', err });
      });
});

// view saved post
router.get('/:hash', async (req: Request, res: Response) => {
    const blogId: string = req.params.hash;
    const post = await Post.findOne({ hash: blogId });
    if (post) {
      res.json({ success: true, post });  
    } else {
      res.json({ success: false, post });  
    }
});

// comment on saved post
router.post('/comment/:hash', authenticateJwt, async (req: Request, res: Response) => {
  const { content } = req.body;
  // TODO: zod
  const userName = req.headers["userName"]
  const blogId: string = req.params.hash;
  const post = await Post.findOne({ hash: blogId });
  if (post) {
    post.comments.push({ content, username: userName, timestamp: Date.now() })
    await post.save()
    res.json({ success: true, msg: "Posted." });
  } else {
    res.json({ success: false, msg: "Error." });
  }
});

// like a saved post
router.get('/like/:hash', authenticateJwt, async (req: Request, res: Response) => {
  const blogId: string = req.params.hash;
  const userName: any = req.headers["userName"]
  // FIXME: a bug of types userName has types (string, string[], undefined)

  const post = await Post.findOne({ hash: blogId });
  if (post) {
    post.likes.push(userName)
    await post.save()
    res.json({ success: true, msg: "Liked." });
  } else {
    res.json({ success: false, msg: "Error." });
  }
});

// TODO: make a endpoint for editing post

export default router;
