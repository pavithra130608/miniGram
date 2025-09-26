import React, { useState } from "react";
import Comment from "./Comment";

function Post({ post, toggleLike, addComment, deletePost, currentUser }) {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src="https://via.placeholder.com/40"
          alt="user"
          className="user-avatar"
        />
        <div>
          <span className="username">@{post.user}</span>
          <br />
          <span className="timestamp">{formatDateTime(post.id)}</span>
        </div>
      </div>
{post.image && <img src={post.image} alt="Post" className="post-image" />}

{post.video && (
  <video
    src={post.video}
    controls
    className="post-video"
    style={{ maxWidth: "100%", marginTop: "10px" }}
  />
)}

{post.caption && (
  <p className="caption"><b>@{post.user}</b> {post.caption}</p>
)}

{post.link && (
  <p>
    🔗 <a href={post.link} target="_blank" rel="noopener noreferrer">
      {post.link}
    </a>
  </p>
)}

      <div className="post-actions">
        <button onClick={() => toggleLike(post.id)}>❤️ {post.likes || 0}</button>

        {/* ✅ Delete button only for logged-in user */}
        {currentUser.username === post.user && (
          <button
            onClick={() => deletePost(post.id)}
            style={{
              marginLeft: "10px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            🗑 Delete
          </button>
        )}
      </div>

      <div className="comments">
        {(post.comments || []).map((c, idx) => (
          <Comment key={idx} text={c} />
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default Post;
