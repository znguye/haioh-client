import TopNavBar from "../../navbars/TopNavBar.jsx";
import BottomNavBar from "../../navbars/BottomNavBar.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css"
import ProfileCard from "../card/ProfileCard.jsx";



export default function MatchmakerHomeScreen() {
    const [profiles, setProfiles] = useState([]);
    const [err, setError] = useState("");

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const res = await fetch("/profiles");
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
            <Link 
                to={`/profile/${person.username}`} 
                key={person.id || person.username} 
                style={{ textDecoration: 'none' }}
            >
                <ProfileCard 
                username={person.username}
                photo={person.profilePicture || person.photo || "https://via.placeholder.com/300"}
                tagline={person.tagline}
                />
            </Link>
            ))}
        </div>

        <div className="bottom-nav-wrapper">
            <BottomNavBar />
        </div>
        </div>
    );
    }
