import React, { useState, useEffect } from "react";
import PostForm from "./component/PostForm";
import PostList from "./component/PostList";
import Login from "./component/Login";
import "./App.css";

function App() {
  // Initialize posts
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      try {
        const parsed = JSON.parse(storedPosts).map((p) => ({
          ...p,
          likes: p.likes || 0,
          comments: p.comments || [],
          link: p.link || "",
        }));
        parsed.sort((a, b) => b.id - a.id);
        return parsed;
      } catch (err) {
        console.error("Error parsing posts:", err);
        return [];
      }
    }
    return [];
  });

  // Initialize currentUser as object
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeTab, setActiveTab] = useState("home");

  // Save posts whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Save currentUser whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Add Post
  const addPost = ({ caption, image, video, link }) => {
  const newPost = {
    id: Date.now(),
    user: currentUser.username,
    caption: caption || "",
    image: image || null,
    video: video || null,  // ✅ store video
    link: link || "",
    likes: 0,
    comments: [],
  };
  setPosts((prevPosts) => [newPost, ...prevPosts]);
  setActiveTab("home");
};


  // Toggle Like
  const toggleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // Add Comment
  const addComment = (id, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, text] } : p
      )
    );
  };

  // Delete Post (only logged-in user can delete their posts)
  const deletePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.filter((p) => p.id !== id)
    );
  };

  // Login
  const handleLogin = (username, profilePhoto = "") => {
    const userObj = { username, profilePhoto };
    setCurrentUser(userObj);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Profile picture change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser({ ...currentUser, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <h1>MiniGram</h1>
      <p>Welcome, {currentUser.username} 🎉</p>

      {currentUser.profilePhoto && (
        <img
          src={currentUser.profilePhoto}
          alt="Profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      )}

      {/* Navbar */}
      <div className="navbar">
        <button onClick={() => setActiveTab("home")}>🏠 Home</button>
        <button onClick={() => setActiveTab("post")}>➕ Post</button>
        <button onClick={() => setActiveTab("settings")}>⚙️ Settings</button>
      </div>

      {/* Tab Content */}
      <div className="content">
        {activeTab === "home" && (
          <PostList
            posts={posts}
            toggleLike={toggleLike}
            addComment={addComment}
            deletePost={deletePost}       // ✅ pass delete function
            currentUser={currentUser}     // ✅ pass current user
          />
        )}
        {activeTab === "post" && <PostForm addPost={addPost} />}
        {activeTab === "settings" && (
          <div className="settings">
            <h2>Settings ⚙️</h2>
            <div style={{ marginBottom: "15px" }}>
              <p>Profile Picture:</p>
              {currentUser.profilePhoto ? (
                <img
                  src={currentUser.profilePhoto}
                  alt="Profile"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
              ) : (
                <span>🙂 No profile photo</span>
              )}
              <br />
              <input type="file" onChange={handleProfileChange} />
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
