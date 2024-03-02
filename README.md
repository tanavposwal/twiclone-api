# TWICLONE API

api for twitter clone in (ts, express, mongodb)
> work going on please consider contributing.



1. **User Management:**
   - `/user/register`: Allow users to register for a new account.
      POST - body{username, password, displayName}
   - `/user/login`: Authenticate users and generate access tokens.
      POST - body{username, password}
   - `/user/{username}`: Retrieve user profiles.
      GET - {user}
   - `/user/me`: Retrieve my profiles.
      GET - {user}
   - `/user/me/edit`: Update user profiles.
      POST - body{displayName, bio, profilePicture}

2. **Post Management:**
   - `/post`: Retrieve a list of posts (timeline).
      GET - {post}
   - `/post/{hash}`: Retrieve a specific post.
      GET - {post}
   - `/post/create`: Create a new post.
      POST - body{content, image}
   - `/post/{hash}/edit`: Edit an existing post.
   - `/post/{hash}/delete`: Delete a post.
      POST - {msg}

3. **Comment Management:**
   - `/post/{hash}/comments`: Retrieve comments for a specific post.
      GET - {comments}
   - `/post/{hash}/comments/create`: Add a comment to a post.
      POST - body{content}
   - `/post/{hash}/comment/edit`: Edit a comment.
   - `/post/{hash}/comment/delete`: Delete a comment.

4. **Like/Dislike Management:**
   - `/post/{hash}/like`: Like a post.
      GET - {msg}
   - `/post/{hash}/dislike`: Dislike a post.
      GET - {msg}
   - `/post/{hash}/likes`: Retrieve users who liked a post.
      GET - {likes}

5. **Follow/Unfollow Management:**
   - `/user/{username}/follow`: Follow a user.
      POST - {msg}
   - `/user/{username}/unfollow`: Unfollow a user.
      POST - {msg}
   - `/user/{username}/followers`: Retrieve followers of a user.
      GET - {follower}
   - `/user/{username}/following`: Retrieve users that a user is following.
      GET - {following}

6. **Search:**
   - `/user/{query}`: Search for users.
   - `/post/{query}`: Search for posts.

