import { useEffect, useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";

import TopNavBar from "../../navbars/TopNavBar.jsx";
import BottomNavBar from "../../navbars/BottomNavBarMatchmaker.js";
import MessageModal from "../../modals/MessageModal.jsx";
import "./LonerDashboardScreen.css";

export default function MatchListScreen() {
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("email"); // store this on login

        const res = await fetch(`/matchmaking-actions/liked-by/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const actions = await res.json();

        // Load full profiles for each liked profileId
        const profileResponses = await Promise.all(
          actions.map((action) =>
            fetch(`/profiles/${action.profileId}`).then((res) => res.json())
          )
        );

        setMatches(profileResponses);
      } catch (err) {
        console.error(err);
        setError("Failed to load match list.");
      }
    }

    fetchMatches();
  }, []);

  const handleDelete = (id) => {
    setMatches(matches.filter(profile => profile._id !== id));
  };

  return (
    <div className="dashboard-screen-container">
      <div className="top-nav-wrapper">
        <TopNavBar />
      </div>

      <div className="dashboard-container">
        <div className="profile-header">
          <h3 className="match-list-title">Match List</h3>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="match-list">
          {matches.map((profile) => (
            <div key={profile._id} className="match-row">
              <div className="profile-info">
                <img
                  src={profile.profilePicture || profile.photo || "https://via.placeholder.com/300"}
                  alt={profile.first_name}
                  className="profile-photo"
                />
                <div className="text-info">
                  <span className="username">@{profile.username}</span>
                  <span className="action-tag">Matched</span>
                </div>
              </div>

              <div className="icon-actions">
                <button onClick={() => setSelectedProfile(profile)} aria-label="Message">
                  <MessageCircle size={18} />
                </button>

                <button onClick={() => handleDelete(profile._id)} aria-label="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {selectedProfile && (
            <MessageModal
              username={selectedProfile.username}
              onClose={() => setSelectedProfile(null)}
            />
          )}
        </div>
      </div>

      <div className="bottom-nav-wrapper">
        <BottomNavBar />
      </div>
    </div>
  );
}
