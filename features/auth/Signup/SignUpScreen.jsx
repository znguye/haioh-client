import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../auth/Auth.css';
import { Link } from 'react-router-dom';

export default function SignUpScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Mock signup logic to store user data in localStorage
        const newUser = { email, password};
        localStorage.setItem(email, JSON.stringify(newUser));
        // onSignUp(newUser);
        console.log("Navigating to /signup/name");
        navigate('name'); // Redirect to name entry after signup using relative route
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSignUp}>
                <h2>Create a new account</h2>
                <p>Enter your email below to create a new account</p>

                <label>Email</label>
                <input
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="••••••"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="login-btn">
                    Sign Up
                </button>

                {/* <button 
                    type="button" 
                    className="google-btn"
                    onClick={() => alert('Google Sign Up not implemented yet')}
                >
                    Sign Up with Google
                </button> */}

                <p className="signup-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}