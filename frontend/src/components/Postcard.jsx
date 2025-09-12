import { useState } from "react";
import "./PostCard.css";

const PostCard = ({ userName, userRole, avatar, content, image }) => {
  const [showModal, setShowModal] = useState(false);

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
        <button>👍 Like</button>
        <button>🔗 Share</button>
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
