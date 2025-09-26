import React from "react";

function Navbar({ currentUser }) {
  if (!currentUser) return null;

  return (
    <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
      {currentUser.profilePhoto ? (
        <img
          src={currentUser.profilePhoto}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
      ) : (
        <span style={{ marginRight: "10px" }}>🙂</span>
      )}

      <label style={{ fontWeight: "bold", marginRight: "5px" }}>
        Logged in as:
      </label>
      <span>{currentUser.username}</span> {/* ✅ render only the string */}
    </div>
  );
}

export default Navbar;
