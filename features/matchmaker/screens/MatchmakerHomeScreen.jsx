import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../../../components/ui/card/ProfileCard.jsx";
import BottomNavBarMatchmaker from "../../../components/ui/navbars/BottomNavBarMatchmaker.jsx";


export default function MatchmakerHomeScreen() {
    const mockProfiles = [
    {
      id: 1,
      name: "Ellie",
      tagline: "Ellie loves cats and coding — find her a fellow cat dad 🐈‍⬛",
      photo: "https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg"
    },
    {
      id: 2,
      name: "Josh",
      tagline: "Josh builds drones but hasn’t landed a date yet 🚁",
      photo: "https://images.pexels.com/photos/2915216/pexels-photo-2915216.jpeg"
    },
  ];

    
    return (
        <div classame ="screen-container">
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
                        role="matchmaker"
                    />
                ))}
            </div>

            <div className="bottom-nav-wrapper">
                <BottomNavBarMatchmaker />
            </div>
        </div>
    );
    }