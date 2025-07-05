import TopNavBar from "../../../components/ui/navbars/TopNavBar.jsx";
import BottomNavBarLoner from "../../../components/ui/navbars/BottomNavbarLoner.jsx";
import './LonerProfile.css'; 

export default function LonerProfile(){

      const profile = {
        name: 'Valerie Tan',
        username: 'iced_watermelon',
        photo: 'https://images.pexels.com/photos/32630160/pexels-photo-32630160.jpeg', 
        tagline: 'A gentle soul with a sharp tongue — handle with care',
        about: "Valerie Tan might pretend she is emotionally unavailable, but don’t be fooled — she’s a therapist, so she probably understands your feelings before you do. She’s a little shy, deeply sarcastic (yes, that eye-roll was affectionate), and honestly kind to the core. Dating isn’t exactly her natural habitat — she gets flustered, overthinks texts, and will probably apologize for “being awkward” even though she’s not. But if you’re lucky enough to get past the quiet and the jokes, you’ll find someone who listens deeply, cares fiercely, and gives more than she ever lets on.",
        basic: {
        age: 29,
        from: 'Singapore',
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