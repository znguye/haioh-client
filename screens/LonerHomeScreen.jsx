import TopNavBar from "../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../components/ui/card/ProfileCard.jsx";
import BottomNavBar from "../components/ui/navbars/BottomNavBar.jsx";


import './LonerHomeScreen.css';

export default function LonerHomeScreen() {
const mockProfiles = [
  {
    id: 1,
    name: "Michelle",
    tagline: "Just ran a mountain trail and baked banana bread. Ask me which was harder 🥾🍌",
    photo: "https://images.pexels.com/photos/2108809/pexels-photo-2108809.jpeg",
  },
  {
    id: 2,
    name: "Mike",
    tagline: "Built a ramen robot, now looking for someone to taste test it #ramenrobot",
    photo: "https://images.pexels.com/photos/17924664/pexels-photo-17924664.jpeg",
  },
  {
    id: 3,
    name: "Layla",
    tagline: "Museum hopper by day, secret DJ by night. Let’s vibe!",
    photo: "https://images.pexels.com/photos/1694908/pexels-photo-1694908.jpeg",
  },
  {
    id: 4,
    name: "Jay",
    tagline: "Can solve a Rubik's cube in 30s... but not my laundry puzzle 😂",
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
            />
          ))}
        </div>

        <div className="bottom-nav-wrapper">
          <BottomNavBar />
        </div>
      </div>
);
};

