import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../../../components/ui/card/ProfileCard.jsx";
import BottomNavBarLoner from "../../../components/ui/navbars/BottomNavbarLoner.jsx";


import './LonerHomeScreen.css';
// import { useState } from "react";

export default function LonerHomeScreen() {
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
  },
  {
    id: 3,
    name: "Layla",
    username: "layla_the_museum_hopper",
    tagline: "Museum hopper by day, secret DJ by night. Let’s vibe!",
    photo: "https://images.pexels.com/photos/1694908/pexels-photo-1694908.jpeg",
  },
  {
    id: 4,
    name: "Jay",
    username: "jay_the_gamer",
    tagline: "Can beat you in any game, but still can’t beat my mom at cooking.",
    photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
  }
];
  

    return (
      <div className="screen-container">
        <div className="top-nav-wrapper">
          <TopNavBar />
        </div>

        <div className="main-content scroll-container">
          {mockProfiles.map((person) => (
            <ProfileCard 
              key={person.id} 
              name={person.name} 
              photo={person.photo} 
              tagline={person.tagline}
              role="loner"
            />
          ))}
        </div>

        <div className="bottom-nav-wrapper">
          <BottomNavBarLoner />
        </div>
      </div>
    );
};

