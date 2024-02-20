# TWICLONE API

api for twitter clone in (ts, express, mongodb)
> work going on please consider contributing.

1. **User Management:**
   - `/register`: Allow users to register for a new account.
   - `/login`: Authenticate users and generate access tokens.
   - `/logout`: Invalidate access tokens and log out users.
   - `/profile/{username}`: Retrieve user profiles.
   - `/profile/{username}/edit`: Update user profiles.

2. **Post Management:**
   - `/posts`: Retrieve a list of posts (timeline).
   - `/posts/{id}`: Retrieve a specific post.
   - `/posts/create`: Create a new post.
   - `/posts/{id}/edit`: Edit an existing post.
   - `/posts/{id}/delete`: Delete a post.

3. **Comment Management:**
   - `/posts/{id}/comments`: Retrieve comments for a specific post.
   - `/posts/{id}/comments/create`: Add a comment to a post.
   - `/posts/{id}/comments/{comment_id}/edit`: Edit a comment.
   - `/posts/{id}/comments/{comment_id}/delete`: Delete a comment.

4. **Like/Dislike Management:**
   - `/posts/{id}/like`: Like a post.
   - `/posts/{id}/dislike`: Dislike a post.
   - `/posts/{id}/likes`: Retrieve users who liked a post.

5. **Follow/Unfollow Management:**
   - `/users/{username}/follow`: Follow a user.
   - `/users/{username}/unfollow`: Unfollow a user.
   - `/users/{username}/followers`: Retrieve followers of a user.
   - `/users/{username}/following`: Retrieve users that a user is following.

6. **Search:**
   - `/user/{query}`: Search for users.
   - `/post/{query}`: Search for posts.

7. **Trending Topics:**
   - `/trending`: Retrieve trending topics or hashtags.

8. **Notifications:**
   - `/notifications`: Retrieve notifications for the user.
   - `/notifications/mark_as_read`: Mark notifications as read.

9. **Direct Messaging:**
   - `/messages`: Retrieve direct messages.
   - `/messages/send`: Send a direct message.

10. **Analytics:**
   - `/analytics/user/{username}`: Retrieve analytics for a specific user.
   - `/analytics/posts/{id}`: Retrieve analytics for a specific post.
