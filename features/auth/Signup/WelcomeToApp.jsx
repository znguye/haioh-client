// A Welcome screen, to be animated later in the future

import '../Auth.css'
import {useNavigate} from 'react-router-dom';
import useOnboarding from '../../../context/useOnboarding.jsx';

export default function WelcomeToApp() {
    const navigate = useNavigate();
    // const location = useLocation();
    const { userData } = useOnboarding();

    const handleContinue = () => {
      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Notify app that user has signed in
      window.dispatchEvent(new CustomEvent('userSignedIn', { detail: userData }));

      // Set role explicitly if it's in userData
      if (userData?.role === 'loner' || userData?.role === 'matchmaker') {
        localStorage.setItem('yakrush-role', userData.role);
      }

      // Redirect to home page after welcome
      navigate('/'); 
    };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome, {userData?.firstName || userData?.username}!</h2>
        <p>Your Cupid mode has been activated.</p>

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
