import TopNavBar from "../../navbars/TopNavBar.jsx";
import BottomNavBarLoner from "../../navbars/BottomNavbarLoner.js";
import './Profile.css'; 
import { useEffect, useState } from "react";

export default function LonerProfile(){

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/profiles/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to load your profile.");
        console.error(err);
      }
    }

    fetchProfile();
  }, []);

  const calculateAge = (birthday) => {
    if (!birthday) return "";
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const Section = ({ title, content }) => (
      <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{content}</div>
      </div>
  );

    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profile) {
      return <p>Loading...</p>;
    }

  return (
        <div className="screen-container">
          <div className="top-nav-wrapper">
            <TopNavBar />
          </div>

          <main className="profile-content">
            <div className="profile-card">
              <img
                src={profile.profilePicture || profile.photo || "https://via.placeholder.com/300"}
                alt="Profile"
                className="profile-photo"
              />
              <h1 className="profile-name">{profile.first_name} {profile.last_name}</h1>
              <h3 className="profile-tagline">{profile.tagline}</h3>

              <Section title="About" content={profile.description || "No description yet."} />

              <Section
                title="Basic Info"
                content={
                  <>
                    <p>Age: {calculateAge(profile.birthday)}</p>
                    <p>Gender: {profile.gender || profile.sex}</p>
                    <p>From: {profile.from}</p>
                  </>
                }
              />
            </div>
          </main>

          <div className="bottom-nav-wrapper">
            <BottomNavBar />
          </div>
        </div>
      );
}