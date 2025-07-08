import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "./PublicProfilePage.css";

import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import MessageModal from "../modals/MessageModal.jsx";

function splitDescription(text, maxLen = 120) {
  const sentences = text?.match(/[^.!?]+[.!?]?/g) || [];
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
  const [descriptionChunks, setDescriptionChunks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [error, setError] = useState("");
  const offsetY = 50;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/profiles/${username}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data.profile);
        setDescriptionChunks(splitDescription(data.profile.description));
      } catch (err) {
        setError("Could not load profile.");
        console.error(err);
      }
    }
    fetchProfile();
  }, [username]);

  async function handleMatch() {
    try {
      const res = await fetch("/matchmakingActions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: add authorization if needed
        },
        body: JSON.stringify({
          profileId: profile._id,
          actionType: "like",
        }),
      });

      if (!res.ok) throw new Error("Failed to record match");
      alert("Added to match list!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

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
              backgroundImage: `url(${profile.profilePicture || "https://via.placeholder.com/300"})`,
              backgroundSize: "cover",
              backgroundPosition: `center ${offsetY}%`,
            }}
          />

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
              @{profile.username} • {profile.age || "unknown"} • from {profile.location || "somewhere"}
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
