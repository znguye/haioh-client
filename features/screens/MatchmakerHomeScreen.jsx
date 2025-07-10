import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css"
import ProfileCard from "../card/ProfileCard.jsx";
const API = "https://yakrush.onrender.com";


export default function MatchmakerHomeScreen() {
    const [profiles, setProfiles] = useState([]);
    const [err, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const res = await fetch(`${API}/profiles`)
                const data = await res.json();
                setProfiles(data);
            } catch (err) {
                setError(err.message);
            }
        }fetchProfiles();
    }, []);

    return (
        <div className="screen-container">
            <div className="top-nav-wrapper">
                <TopNavBar />
            </div>

        <div className="main-content scroll-container">
            {err && <p className="error">{err}</p>}
            {profiles.length === 0 && !err && <p>Profiles not found!</p>}

            {profiles.map((person) => (
            <ProfileCard 
                key={person.id || person.username}
                username={person.username}
                photo={person.profilePicture || person.photo || "https://via.placeholder.com/300"}
                tagline={person.tagline}
                onClick={() => navigate(`/profiles/${person.username}`)}
            />
            ))}
        </div>

        <div className="bottom-nav-wrapper">
            <BottomNavBar />
        </div>
        </div>
    );
    }
