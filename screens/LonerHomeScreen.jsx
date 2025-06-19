import TopNavBar from "../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../components/ui/card/ProfileCard.jsx";
import ActionButtons from "../components/ui/buttons/ActionButtons.jsx";
import TagLineCard from "../components/ui/card/TagLineCard.jsx";
import BottomNavBar from "../components/ui/navbars/BottomNavBar.jsx";

import { useState } from "react";
import './LonerHomeScreen.css';

export default function LonerHomeScreen() {

  const mockProfiles = [
        {
          id: 1,
          name: "Person A",
          tagline: "Loves hiking and spontaneous karaoke",
          photo: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          id: 2,
          name: "Person B",
          tagline: "Always down for ramen & thunderstorms",
          photo: "https://randomuser.me/api/portraits/men/22.jpg",
        },
    ];
    
    // Keeping track of matches
    const [currentIndex, setCurrentIndex] = useState(0);
    const person = mockProfiles[currentIndex];

    const handleNext = () => {
      setCurrentIndex((index) => (index + 1) % mockProfiles.length);
    };

    return (
      <div className="screen-container">
        <div className="top-nav-wrapper">
          <TopNavBar />
        </div>

        <div className="main-content">
          <ProfileCard name={person.name} photo={person.photo} />
          <ActionButtons onClick={handleNext} />
          <p className="tagline-text">
            <TagLineCard tagline={person.tagline} />
          </p>
        </div>

        <div className="bottom-nav-wrapper">
          <BottomNavBar />
        </div>
      </div>
    );
};

