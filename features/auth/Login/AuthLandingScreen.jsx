// A cool first screen whenever the user opens the app.

import './AuthLandingScreen.css';
import { FishSymbol } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function AuthLandingScreen() {
  const navigate = useNavigate();

  return (
    <div className="auth-landing-screen">
        <div className="overlay">
            <div className="content-group">
                <h1 className="app-name">Yakrush</h1>
                <FishSymbol className="app-icon" size={48} color="#fff" />
                <p className="tagline">Half for crushes. Half for chaos.</p>
            </div>
            

            <div className="button-group">
                <p className="terms">
                    By tapping 'Sign in' / 'Create an account', you agree to our{" "}
                    <a href="#">Terms of Service</a>. Learn how we process your data in our{" "}
                    <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
                </p>
                <button className="create-account-btn" onClick={() => navigate('/signup')}>Create an account</button>
                <button className="sign-in-btn" onClick={() => navigate('/login')}>Sign in</button>
            </div>
        </div>
    </div>
  );
};