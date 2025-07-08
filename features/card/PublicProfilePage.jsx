import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "./PublicProfilePage.css";

import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBarMatchmaker from "../navbars/BottomNavBarMatchmaker.js";
import MessageModal from "../modals/MessageModal.jsx";

// Function to split description into chunks
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


const mockProfiles = [
  {
    id: 1,
    name: "Ellie",
    username: "ellie_the_catlover",
    tagline: "Ellie loves cats and coding — find her a fellow cat dad 🐈‍⬛",
    photo: "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg",
    description: "A quiet but curious soul who enjoys building beautiful things on the web. Often found in cafes or next to a purring cat. She has a deep love for minimal design, meaningful conversations, and rainy afternoons with a good book. When she’s not debugging code, she’s daydreaming about future travel or curating oddly satisfying playlists. She’s thoughtful, creative, and a little mysterious — but once you get to know her, you’ll find someone who values depth, kindness, and a good meme.",
    age: 28,
    location: "Barcelona",
  },
  {
    id: 2,
    name: "Josh",
    username: "dronejosh",
    tagline: "Josh builds drones but hasn’t landed a date yet 🚁",
    photo: "https://images.pexels.com/photos/2915216/pexels-photo-2915216.jpeg",
    description: "Drone enthusiast. Might fly into your heart (but never crash). Loves tinkering with tech, filming cityscapes from above, and geeking out over aviation documentaries. Josh is the kind of guy who brings snacks for the whole crew and remembers everyone’s birthday. He’s loyal, laid back, and secretly writes poetry — but don’t tell his friends. Looking for someone to explore abandoned rooftops with or binge sci-fi while eating homemade ramen.",
    age: 27,
    location: "Lisbon",
  }
];

export default function PublicProfilePage() {
  const { username } = useParams();
  const [profile, setProfile ] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const offsetY = 50; // default centered

  useEffect(() => {
    const found = mockProfiles.find((p) => p.username === username);
    setProfile(found);
  }, [username]);

  if (!profile) return <div>Profile not found</div>;

  const descriptionChunks = splitDescription(profile.description);

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
              {profile.username} • {profile.age} • from {profile.location}
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
            <button className="action-btn light">
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
        <BottomNavBarMatchmaker />
      </div>
    </div>
  );
}