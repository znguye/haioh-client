import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import MessageModal from "../modals/MessageModal.jsx";
import "./PublicProfilePage.css";

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

export default function PublicProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [offsetY, setOffsetY] = useState(50);
  const imageRef = useRef(null);
  const startY = useRef(0);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
        const res = await fetch(`${API_URL}/profiles/${username}`);
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        } else {
          alert("Profile not found");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    }
    fetchProfile();
  }, [username]);

  const handleTouchStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY.current;
    const newOffset = Math.min(100, Math.max(0, offsetY + deltaY / 2));
    setOffsetY(newOffset);
    startY.current = currentY;
  };

    const handleMatch = async () => {
    try {
      const token = localStorage.getItem("token");
      const actorEmail = localStorage.getItem("email");
      const profileId = profile?.id || profile?._id;
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

      if (!profileId) {
        throw new Error("Missing profile ID");
      }

      //test
      console.log("Sending match:", {
        profileId,
        actorEmail,
        actionType: "like",
      });

      const res = await fetch(`${API_URL}/matchmaking-actions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId,
          actorEmail,
          actionType: "like",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Match response:", errorText);
        throw new Error("Failed to record match");
      }
      alert("Matched!");
    } catch (err) {
      console.error("Error in handleMatch:", err);
      alert("Something went wrong");
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  const descriptionChunks = splitDescription(profile.description);

  return (
    <div className="screen-container">
      <div className="top-nav-wrapper">
        <TopNavBar onLogout={() => {
          localStorage.clear();
          window.location.href = '/auth';
        }} />
      </div>

      <main className="profile-content">
        <div className="profile-card flat-style">
          <div
            className="header-image-wrapper"
            style={{
              backgroundImage: `url(${profile.profilePicture || profile.photo})`,
              backgroundSize: "cover",
              backgroundPosition: `center ${offsetY}%`,
            }}
            ref={imageRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          ></div>

          <div className="tagline-box no-bg">
            <h6 className="tagline tagline-purple">{profile.tagline}</h6>
          </div>

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

          <div className="profile-meta subdued">
            <span className="profile-basic-info">
              @{profile.username} • {profile.age || "unknown"} • from {profile.from || "unknown"}
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
            <button className="action-btn light" onClick={handleMatch}>
              <Heart size={18} /> Match
            </button>
            <button
              className="action-btn dark"
              onClick={() => setShowMessageModal(true)}
            >
              <MessageCircle size={18} /> Message
            </button>
          </div>
        </div>
      </main>

      <div className="bottom-nav-wrapper">
        <BottomNavBar />
      </div>
    </div>
  );
}
