import { useState, useRef } from "react";
import { Edit, Heart, MessageCircle, Check, X } from "lucide-react";
import "./CreateProfileScreen.css";

import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import BottomNavBarMatchmaker from "../../../components/ui/navbars/BottomNavBarMatchmaker.jsx";
import MessageModal from "../../modals/MessageModal.jsx";

function splitDescription(text, maxLen = 120) {
  const sentences = text.match(/[^.!?]+[.!?]?/g) || [];
  const chunks = [];
  let current = "";

  for (let sentence of sentences) {
    if ((current + sentence).length > maxLen) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  if (chunks.length === 0) chunks.push("No description available.");

  return chunks;
}

export default function CreateProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [tagline, setTagline] = useState("A gentle soul with a sharp tongue - handle with care!");
  const [description, setDescription] = useState(
    "She might pretend she’s emotionally unavailable, but don’t be fooled — she’s a therapist, so she probably understands your feelings before you do. She’s a little shy, deeply sarcastic, and honestly kind to the core. Dating isn’t exactly her natural habitat — she gets flustered, overthinks texts, and will probably apologize for “being awkward” even though she’s not. But if you’re lucky enough to get past the quiet and the jokes, you’ll find someone who listens deeply, cares fiercely, and gives more than she ever lets on."
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [offsetY, setOffsetY] = useState(50); // default centered

  const profile = {
    name: "Valerie Tan",
    username: "iced_watermelon",
    photo: "https://images.pexels.com/photos/32630160/pexels-photo-32630160.jpeg",
    basic: { age: 29, from: "Singapore" },
  };

  const descriptionChunks = splitDescription(description);

  const imageRef = useRef(null);
  const dragging = useRef(false);
  const startY = useRef(0);

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const handleTouchStart = (e) => {
    dragging.current = true;
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY.current;
    const newOffset = Math.min(100, Math.max(0, offsetY + deltaY / 2));
    setOffsetY(newOffset);
    startY.current = currentY;
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  return (
    <div className="screen-container">
      <div className="top-nav-wrapper">
        <TopNavBar />
      </div>

      <main className="profile-content">
        <div className="profile-card flat-style">
          <div
            className="header-image-wrapper"
            style={{
              backgroundImage: `url(${profile.photo})`,
              backgroundSize: 'cover',
              backgroundPosition: `center ${offsetY}%`,
            }}
            ref={imageRef}
            onMouseDown={isEditing ? handleTouchStart : null}
            onMouseMove={isEditing ? handleTouchMove : null}
            onMouseUp={isEditing ? handleTouchEnd : null}
            onTouchStart={isEditing ? handleTouchStart : null}
            onTouchMove={isEditing ? handleTouchMove : null}
            onTouchEnd={isEditing ? handleTouchEnd : null}
          >
            {isEditing ? (
              <div className="edit-controls">
                <button onClick={handleCancel}><X size={20} /></button>
                <button onClick={handleSave}><Check size={20} /></button>
              </div>
            ) : (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                <Edit size={20} />
              </button>
            )}
          </div>

          <div className="tagline-box no-bg">
            {isEditing ? (
              <textarea
                className="tagline-input native-input full-width"
                value={tagline}
                maxLength={100}
                placeholder="Enter a short tagline"
                onChange={(e) => setTagline(e.target.value)}
              />
            ) : (
              <h6 className="tagline tagline-purple">{tagline}</h6>
            )}
          </div>

          {isEditing ? (
            <textarea
              className="description-input native-input large-input"
              value={description}
              maxLength={600}
              placeholder="Write a few sentences to describe this person"
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div className="description-swiper fixed-height">
              <div className="description-inner">
                <p className="description">{descriptionChunks[currentSlide]}</p>
                {descriptionChunks.length > 1 && (
                  <div className="pagination-dots">
                    {descriptionChunks.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="profile-meta subdued">
            <span className="profile-basic-info">
              {profile.username} • {profile.basic.age} • from {profile.basic.from}
            </span>
          </div>

          <hr className="divider" />

          {showMessageModal && (
            <MessageModal
              username={profile.username}
              onClose={() => setShowMessageModal(false)}
            />
          )}

          <div className="actions-row column-buttons">
            <button className="action-btn light"> <Heart size={18} /> Match </button>
            <button className="action-btn dark" onClick={() => setShowMessageModal(true)}>
              <MessageCircle size={18} /> Message
            </button>
          </div>
        </div>
      </main>

      <div className="bottom-nav-wrapper">
        <BottomNavBarMatchmaker />
      </div>
    </div>
  );
}
