import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { MessageCircle, Trash2 } from 'lucide-react';

import TopNavBar from '../../components/ui/navbars/TopNavBar.jsx';
import BottomNavBarMatchmaker from '../../components/ui/navbars/BottomNavBarMatchmaker.jsx';
import MessageModal from '../../features/modals/MessageModal.jsx';
import './LonerDashboardScreen.css';

const mockProfiles = [
  {
    id: 1,
    name: "Mike",
    username: "mike_the_mountain",
    tagline: "Just ran a mountain trail and baked banana bread. Ask me which was harder 🥾🍌",
    photo: "https://images.pexels.com/photos/2108809/pexels-photo-2108809.jpeg",
  },
  {
    id: 2,
    name: "Michelle",
    username: "michelle_the_chef",
    tagline: "Built a ramen robot, now looking for someone to taste test it #ramenrobot",
    photo: "https://images.pexels.com/photos/17924664/pexels-photo-17924664.jpeg",
  }
];

//Mock profile for Valerie, the loner
  const ValerieProfile = {
    name: "Valerie Tan",
    username: "iced_watermelon",
    photo: "https://images.pexels.com/photos/32630160/pexels-photo-32630160.jpeg",
    basic: { age: 29, from: "Singapore" },
  };

export default function LonerDashboardScreen() {
    const [matches, setMatches] = useState(mockProfiles);
//   const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState(null);


  const handleDelete = (id) => {
    setMatches(matches.filter(profile => profile.id !== id));
  };

  return (
    <div className="dashboard-screen-container">
      <div className="top-nav-wrapper">
        <TopNavBar />
      </div>

      <div className="dashboard-container">
        <div className="profile-header">
          <img src={ValerieProfile.photo} alt="Valerie" className="avatar-large" />
          <h3 className="match-list-title">Match List</h3>
        </div>

        <div className="match-list">
          {matches.map((profile) => (
            <div key={profile.id} className="match-row">
              <div className="profile-info">
                <img src={profile.photo} alt={profile.name} className="profile-photo" />
                <div className="text-info">
                  <span className="username">@{profile.username}</span>
                  <span className="action-tag">Matched</span>
                </div>
              </div>

              <div className="icon-actions">
                <button onClick={() => setSelectedProfile(profile)} aria-label="Message">
                    <MessageCircle size={18} />
                </button>

                <button onClick={() => handleDelete(profile.id)} aria-label="Delete">
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
        <BottomNavBarMatchmaker />
      </div>
    </div>
  );
}