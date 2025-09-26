import React, { useState, useEffect } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // optional, just UI
  const [profilePhoto, setProfilePhoto] = useState("");
  // load existing profile if user already saved

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUsername(parsed.username);
      setProfilePhoto(parsed.profilePhoto || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password!");

 const userData = { username, profilePhoto };
localStorage.setItem("currentUser", JSON.stringify(userData));
onLogin(userData); // ✅ this passes the whole object
  };

  // handle image upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // save as Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setProfilePhoto("");
  };

  return (
    <div className="login-page">
      <h1>MiniGram</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Profile Photo Upload */}
        <div style={{ margin: "10px 0" }}>
          {profilePhoto ? (
            <div>
              <img
                src={profilePhoto}
                alt="Profile"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <br />
              <button type="button" onClick={handleDeletePhoto}>
                Delete Photo
              </button>
            </div>
          ) : (
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          )}
        </div>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
