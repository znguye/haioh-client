import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import ProfileCard from "../../../components/ui/card/ProfileCard.jsx";
import BottomNavBarMatchmaker from "../../../components/ui/navbars/BottomNavBarMatchmaker.jsx";


export default function MatchmakerHomeScreen() {
    const mockProfiles = [
    {
      id: 1,
      name: "Ellie",
      tagline: "Ellie loves cats and coding — find her a fellow cat dad 🐈‍⬛",
      photo: "https://picsum.photos/200?random=1"
    },
    {
      id: 2,
      name: "Josh",
      tagline: "Josh builds drones but hasn’t landed a date yet 🚁",
      photo: "https://picsum.photos/200?random=2"
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