# TWICLONE API

api for twitter clone in (ts, express, mongodb)
> work going on please consider contributing.

******

1. **User Management:**
   - `/user/register`: Allow users to register for a new account.
   - `/user/login`: Authenticate users and generate access tokens.
   - `/user/{username}`: Retrieve user profiles.
   - `/user/me`: Retrieve my profiles.
   - `/user/me/edit`: Update user profiles.

2. **Post Management:**
   - `/post`: Retrieve a list of posts (timeline).
   - `/post/{hash}`: Retrieve a specific post.
   - `/post/create`: Create a new post.
   - `/post/{hash}/edit`: Edit an existing post.
   - `/post/{hash}/delete`: Delete a post.

3. **Comment Management:**
   - `/post/{hash}/comments`: Retrieve comments for a specific post.
   - `/post/{hash}/comments/create`: Add a comment to a post.
   - `/post/{hash}/comment/edit`: Edit a comment.
   - `/post/{hash}/comment/delete`: Delete a comment.

4. **Like/Dislike Management:**
   - `/post/{hash}/like`: Like a post.
   - `/post/{hash}/dislike`: Dislike a post.
   - `/post/{hash}/likes`: Retrieve users who liked a post.

5. **Follow/Unfollow Management:**
   - `/user/{username}/follow`: Follow a user.
   - `/user/{username}/unfollow`: Unfollow a user.
   - `/user/{username}/followers`: Retrieve followers of a user.
   - `/user/{username}/following`: Retrieve users that a user is following.

6. **Search:**
   - `/user/{query}`: Search for users.
   - `/post/{query}`: Search for posts.

