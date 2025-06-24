import { useState } from 'react';
import '../../auth/Auth.css';
import { useNavigate } from 'react-router-dom';
import useOnboarding from '../../../context/useOnboarding.jsx';


export default function BasicInfo() {
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();
    const { updateUserData } = useOnboarding();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!birthday || !gender) {
            return alert("All fields are required.");
        }

        updateUserData({
            birthday,
            gender,
        });

        navigate('/signup/welcome-to-app');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Basic Information</h2>

                <label>
                    Birthday
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Gender
                    <div className="selection-group">
                        {["Male", "Female", "Non-binary"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={`selection-option ${gender === option.toLowerCase() ? 'selected' : ''}`}
                            onClick={() => setGender(option.toLowerCase())}
                        >
                            {option}
                        </button>
                        ))}
                    </div>
                </label>

                <button type="submit" className="login-btn">
                    Next
                </button>
            </form>
        </div>
    );
}
