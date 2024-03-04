import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import { User } from "../models/users"
import { signToken, hashPassword } from '../jwt/utils';
import { authenticateJwt } from '../jwt/auth';

const router: Router = express.Router();

const SignUpSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(8).max(15),
    displayName: z.string().max(15),
});

const LogInSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(8).max(15),
});

// login to app
router.post('/login', async (req: Request, res: Response) => {
    let parsedInput = LogInSchema.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }
    const { username, password } = parsedInput.data 
    
    const user = await User.findOne({ username, password: hashPassword(password) });
    if (user) {
      const token = signToken({ id: user._id, username: user.username })
      res.json({ success: true, msg: 'Logged in successfully',  token });
    } else {
      res.status(403).json({ success: false, msg: 'Invalid username or password' });
    }
});

// create a account
router.post('/register', async (req: Request, res: Response) => {
    let parsedInput = SignUpSchema.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }
    const { username, password, displayName } = parsedInput.data 
    
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ success: false, msg: 'User already exists' });
    } else {
      const newUser = new User({ username, password: hashPassword(password), displayName });
      await newUser.save();
      const token = signToken({ id: newUser._id, username: newUser.username })
      res.json({ success: true, msg: 'User created and logged in successfully', token });
    }
});

// view your profile
router.get('/me', authenticateJwt, async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.json({ success: true, user: {
        username: user.username,
        name: user.displayName,
        bio: user.bio,
        dp: user.profilePicture,
        followers: user.followers.length,
        following: user.following.length,
        since: user.createdAt
      } });
    } else {
      res.status(403).json({ success: false, msg: 'User not logged in' });
    }
})

const EditSchema = z.object({
  displayName: z.string().max(15),
  bio: z.string().max(50),
  profilePicture: z.string().url()
});

// edit profile
router.post('/me/edit', authenticateJwt, async (req: Request, res: Response) => {
  let parsedInput = EditSchema.safeParse(req.body)
  if (!parsedInput.success) {
    return res.status(403).json({
      msg: "error"
    });
  }
  const { displayName, bio, profilePicture } = parsedInput.data;
  
  const userId = req.headers["userId"];
  const user = await User.findOne({ _id: userId });
  if (user) {
    if (displayName) user.displayName = displayName
    if (bio) user.bio = bio
    if (profilePicture) user.profilePicture = profilePicture

    await user.save();
    return res.json({ success: true, msg: 'Profile updated successfully' });
  } else {
    res.status(403).json({ success: false, msg: 'User not logged in' });
  }
})

// view others profile
router.get('/id/:username', async (req: Request, res: Response) => {
  const userName: string = req.params.username;
  const user = await User.findOne({ username: userName });
  if (user) {
    res.json({ success: true, user: {
      username: user.username,
      name: user.displayName,
      bio: user.bio,
      dp: user.profilePicture,
      followers: user.followers.length,
      following: user.following.length,
      since: user.createdAt
    } });
  } else {
    res.status(404).json({ success: false, msg: 'User not found' });
  }
})

router.post('/:username/follow', authenticateJwt, async (req: Request, res: Response) => {
  const userName: any = req.params.username;
  // who wants to follow
  const followerUserName: any = req.headers["userName"]

  try {
    const user1 = await User.findOne({ username: userName });
    const user2 = await User.findOne({ username: followerUserName });
    user1?.followers.push(followerUserName)
    user2?.following.push(userName)
    await user1?.save()
    await user2?.save()
    res.json({ success: true, msg: "Following now" });
  } catch (error) {
    res.json({ success: false, msg: "Error" });
  }
})

router.post('/:username/unfollow', authenticateJwt, async (req: Request, res: Response) => {
  const userName: any = req.params.username;
  // who wants to unfollow
  const followerUserName: any = req.headers["userName"]

  try {
    const user1 = await User.findOne({ username: userName });
    const user2 = await User.findOne({ username: followerUserName });
    User.updateOne(
      { "username": userName },
      { $pull: { "followers": followerUserName } }
    )
    User.updateOne(
      { "username": followerUserName },
      { $pull: { "following": userName } }
    )
    res.json({ success: true, msg: "Following removed" });
  } catch (error) {
    res.json({ success: false, msg: "Error" });
  }
})

router.get('/:username/followers', authenticateJwt, async (req: Request, res: Response) => {
  const userName: any = req.params.username;
  const user = await User.findOne({ username: userName });
  if (user) {
    res.json({ success: true, follower: user.followers })
  } else {
    res.json({ success: false, msg: "User not found" })
  }
})

router.get('/:username/following', authenticateJwt, async (req: Request, res: Response) => {
  const userName: any = req.params.username;
  const user = await User.findOne({ username: userName });
  if (user) {
    res.json({ success: true, following: user.following })
  } else {
    res.json({ success: false, msg: "User not found" })
  }
})

// TODO: endpoint for searching use algolia
// (/query)


export default router;
