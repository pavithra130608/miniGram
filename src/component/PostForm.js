import React, { useState } from "react";

function PostForm({ addPost }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [link, setLink] = useState("");

  // Handle image upload + compression
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500; // limit size
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // compress to 70% quality
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setImage(compressedDataUrl);
          setVideo(null); // reset video if image is selected
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video upload
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
        setImage(null); // reset image if video is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption && !image && !video && !link) return;

    addPost({ caption, image, video, link });
    setCaption("");
    setImage(null);
    setVideo(null);
    setLink("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="file" accept="video/*" onChange={handleVideoChange} />

      <input
        type="url"
        placeholder="Add a link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
