import React from "react";
import Post from "./Post";

function PostList({ posts, toggleLike, addComment, deletePost, currentUser }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          toggleLike={toggleLike}
          addComment={addComment}
          deletePost={deletePost}      // ✅ pass delete
          currentUser={currentUser}    // ✅ pass current user
        />
      ))}
    </div>
  );
}

export default PostList;
