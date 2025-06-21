import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import BottomNavBarLoner from "../../../components/ui/navbars/BottomNavbarLoner.jsx";
import './LonerProfile.css'; 

export default function LonerProfile(){

      const profile = {
        name: 'Valerie Tan',
        photo: 'https://images.pexels.com/photos/32630160/pexels-photo-32630160.jpeg', 
        about: 'Just me, myself, and kopi.',
        love: 'Peace, ramen, long walks with no destination.',
        hate: 'Small talk, loud chewers, and group projects.',
        basic: {
        age: 29,
        race: 'Singaporean Chinese',
        job: 'Therapist',
        },
    };

    const Section = ({ title, content }) => (
        <div className="section">
        <h2 className="section-title">{title}</h2>
        <div className="section-content">{content}</div>
        </div>
    );

    return (
          <div className="screen-container">
            <div className="top-nav-wrapper">
              <TopNavBar />
            </div>
    
            <main className="profile-content">
                <div className="profile-card">
                <img src={profile.photo} alt="Profile" className="profile-photo" />
                <h1 className="profile-name">{profile.name}</h1>

                <Section title="About" content={profile.about} />
                <Section title="Love" content={profile.love} />
                <Section title="Hate" content={profile.hate} />
                <Section
                    title="Basic Info"
                    content={
                    <>
                        <p>Age: {profile.basic.age}</p>
                        <p>Race: {profile.basic.race}</p>
                        <p>Job: {profile.basic.job}</p>
                    </>
                    }
                />
                </div>
            </main>
    
            <div className="bottom-nav-wrapper">
              <BottomNavBarLoner />
            </div>
          </div>
        );
}