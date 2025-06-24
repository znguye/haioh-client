// To enter your firstname, lastname and username.
//Link: /signup/name

import { useState } from 'react';
import '../../auth/Auth.css';
import { useNavigate } from 'react-router-dom';
import useOnboarding from '../../../context/useOnboarding.jsx';


export default function EnterYourName() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');

    const { updateUserData } = useOnboarding();
    const navigate = useNavigate();

    // Handle the next step in the onboarding flow
    const handleNext = (e) => {
        e.preventDefault();
        updateUserData({
            firstName,
            lastName,
            userName,
        });
        navigate('/signup/basic-info'); // Redirect to basic info after entering name
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleNext}>
                <h2>Enter Your Name</h2>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={userName}
                        placeholder='@username'
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </label>
                <button 
                    type="submit" 
                    className='login-btn'
                >
                    Next
                </button>
            </form>
        </div>
    );
}