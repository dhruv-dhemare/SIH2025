import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ import hook
import PostCard from "../components/PostCard.jsx"; 
import profileImg from "../assets/profile.JPG";  
import "./AddPost.css";

const AddPost = () => {
  const navigate = useNavigate(); // hook to navigate
  const [formData, setFormData] = useState({
    content: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const handlePost = () => {
    // TODO: Add actual post submission logic here (API, Firebase, etc.)

    // After submission, redirect to home page
    navigate("/home"); 
  };

  return (
    <div className="add-post-page">
      <h2>Create a New Post</h2>

      {!previewMode && (
        <form className="add-post-form">
          <textarea
            name="content"
            placeholder="Write your post..."
            value={formData.content}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <center>
            <button
              className="submit-btn"
              onClick={handlePreview}
            >
              Preview
            </button>
          </center>
        </form>
      )}

      {previewMode && (
        <div className="post-preview">
          <h3>Preview:</h3>
          <PostCard
            userName="Dhruv Dhemare"
            userRole="FullStack Engineer | AI/ML Enthusiast"
            avatar={profileImg}
            content={formData.content}
            image={imagePreview}
          />
          <center style={{ marginTop: "2vh" }}>
            <button
              className="submit-btn"
              onClick={handlePost}
            >
              Post
            </button>
          </center>
        </div>
      )}
    </div>
  );
};

export default AddPost;
