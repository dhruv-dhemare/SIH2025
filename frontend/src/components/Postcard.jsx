import { useState } from "react";
import { ThumbsUp, Share2 } from "lucide-react";

import "./PostCard.css";

const PostCard = ({ userName, userRole, avatar, content, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <img
          src={avatar}
          alt={`${userName} Avatar`}
          className="avatar"
        />
        <div className="post-user-info">
          <h3 className="user-name">{userName}</h3>
          <p className="user-role">{userRole}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{content}</p>
        {image && (
          <img
            src={image}
            alt="Post content"
            className="post-image"
            onClick={() => setShowModal(true)}
          />
        )}
      </div>

      {/* Post Actions */}

<div className="post-actions">
      <button
        className={`action-btn ${liked ? "active" : ""}`}
        onClick={() => setLiked(!liked)}
      >
        <ThumbsUp
          size={18}
          className={`action-icon ${liked ? "active-icon" : ""}`}
        />
        Like
      </button>

      <button
        className={`action-btn ${shared ? "active" : ""}`}
        onClick={() => setShared(!shared)}
      >
        <Share2
          size={18}
          className={`action-icon ${shared ? "active-icon" : ""}`}
        />
        Share
      </button>
    </div>


      {/* Image Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <img src={image} alt="Full size" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default PostCard;
