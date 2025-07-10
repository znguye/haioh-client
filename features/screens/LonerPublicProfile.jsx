import { useState, useRef, useEffect } from "react";
import { Edit, Heart, MessageCircle, Check, X, Trash2 } from "lucide-react";
import "./Profile.css";

import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import MessageModal from "../modals/MessageModal.jsx";
import DeleteModal from "../modals/DeleteModal.jsx";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

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

export default function LonerPublicProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offsetY, setOffsetY] = useState(50);
  const imageRef = useRef(null);
  const dragging = useRef(false);
  const startY = useRef(0);

  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  // Add delete logic
  async function handleDeleteProfile() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/profiles/${profile.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete profile");
      }
      setShowDeleteModal(false);
      window.location.href = "/add-loner";
    } catch (err) {
      setError(err.message);
    }
  }

  // Save changes to backend
  async function handleSave() {
    try {
      const token = localStorage.getItem("token");
      const updates = {
        tagline: tagline || undefined,
        description: description || undefined,
      };
      Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);
      const res = await fetch(`/profiles`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update profile");
      }
      const data = await res.json();
      setIsEditing(false);
      setProfile(data.profile);
      setTagline(data.profile.tagline || "");
      setDescription(data.profile.description || "");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/profiles/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);
        setTagline(data.tagline || "");
        setDescription(data.description || "");
      } catch (err) {
        setError("Failed to load your profile.");
        console.error(err);
      }
    }

    fetchProfile();
  }, []);

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

  const handleCancel = () => setIsEditing(false);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  const descriptionChunks = splitDescription(description);

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
              backgroundImage: `url(${profile.profilePicture || profile.photo || "https://via.placeholder.com/300"})`,
              backgroundSize: "cover",
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
              <div className="edit-controls" style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', top: 12, right: 12 }}>
                {/* Only Edit icon remains */}
                <button className="edit-button" onClick={() => setIsEditing(true)}><Edit size={20} /></button>
              </div>
            )}
            {showDeleteModal && (
              <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={handleDeleteProfile} />
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
              placeholder="Write a few sentences to describe yourself"
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
              {profile.username} • {profile.gender || profile.sex} • from {profile.from}
            </span>
          </div>

          <hr className="divider" />

          {/* Remove Match and Message buttons, add Delete Profile button */}
          <div style={{ marginTop: 24 }}>
            <button className="action-btn danger" style={{ width: '100%' }} onClick={() => setShowDeleteModal(true)}>
              Delete Profile
            </button>
          </div>

          {showMessageModal && (
            <MessageModal
              username={profile.username}
              onClose={() => setShowMessageModal(false)}
            />
          )}
        </div>
      </main>

      <div className="bottom-nav-wrapper">
        <BottomNavBar />
      </div>
    </div>
  );
}
