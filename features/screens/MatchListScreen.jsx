import { useEffect, useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";

import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import MessageModal from "../modals/MessageModal.jsx";
import "./LonerDashboardScreen.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function MatchListScreen() {
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("email");

        const res = await fetch(`${API_URL}/matchmaking-actions/liked-by/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch match actions");

        const actions = await res.json();

        const profileResponses = await Promise.all(
          actions.map(async (action) => {
            const profileRes = await fetch(`${API_URL}/profiles/by-id/${action.profileId}`);
            if (!profileRes.ok) return null;
            const result = await profileRes.json();
            return result.profile || result; // unwrap if nested
          })
        );

        const validProfiles = profileResponses.filter(Boolean);
        setMatches(validProfiles);
      } catch (err) {
        console.error(err);
        setError("Failed to load match list.");
      }
    }

    fetchMatches();
  }, []);

  const handleDelete = async (profileId) => {
    try {
      const token = localStorage.getItem("token");
      const actorEmail = localStorage.getItem("email");

      const res = await fetch(
        `${API_URL}/matchmaking-actions/${profileId}/${actorEmail}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete match");
      }

      // Remove from UI after successful delete
      setMatches((prev) => prev.filter(p => p.id !== profileId && p._id !== profileId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete match");
    }
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
          {matches.map((profile, index) => (
            <div key={profile.id || profile._id || index} className="match-row">
              <div className="profile-info">
                <img
                  src={profile.profilePicture || profile.photo || "/default-avatar.png"}
                  alt={profile.username ? `${profile.username}'s photo` : "profile"}
                  className="profile-photo"
                />
                <div className="text-info">
                  <span className="username">@{profile.username || "unknown"}</span>
                  <span className="action-tag">Matched</span>
                </div>
              </div>

              <div className="icon-actions">
                <button onClick={() => setSelectedProfile(profile)} aria-label="Message">
                  <MessageCircle size={18} />
                </button>

                <button onClick={() => handleDelete(profile.id || profile._id)} aria-label="Delete">
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
