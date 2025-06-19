import TopNavBar from "../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../components/ui/card/ProfileCard.jsx";
import ActionButtons from "../components/ui/buttons/ActionButtons.jsx";
import TagLineCard from "../components/ui/card/TagLineCard.jsx";
import BottomNavBar from "../components/ui/navbars/BottomNavBar.jsx";

import { useState } from "react";

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
      <>
        <div className="relative w-full min-h-screen bg-[#fefefe] text-gray-800 sm:max-w-sm sm:mx-auto sm:border-x border-neutral-200 font-sans">
    
          <div className="sticky top-0 z-10 bg-white shadow-sm">
            <TopNavBar />
          </div>

          <div>
            <ProfileCard name={person.name} photo={person.photo} />
            <ActionButtons onClick={handleNext} />
          </div>

          <div>
            <p className="mt-4 text-sm italic text-center text-gray-500">
              <TagLineCard tagline={person.tagline} />
            </p>
          </div>
          
          <div className="sticky bottom-0 z-10 bg-white border-t shadow-sm border-neutral-200">
            <BottomNavBar />
          </div>
        </div> 
      </>
      
    );
};

