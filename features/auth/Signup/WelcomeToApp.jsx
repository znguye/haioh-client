// A Welcome screen, to be animated later in the future

import '../Auth.css'
import {useNavigate} from 'react-router-dom';
import useOnboarding from '../../../context/useOnboarding.jsx';

export default function WelcomeToApp() {
    const navigate = useNavigate();
    // const location = useLocation();
    const { userData } = useOnboarding();

    const handleContinue = () => {
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new CustomEvent('userSignedIn', { detail: userData }));
        navigate('/'); // Redirect to home page after welcome
    };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome! {userData?.firstName || userData?.username}</h2>
        <p>You're all set to begin Yakrush journey.</p>

        <button 
            className="login-btn" 
            style={{ marginTop: '2rem' }} 
            onClick={handleContinue}>
            Let's go →
        </button>
      </div>
    </div>
  );
}
