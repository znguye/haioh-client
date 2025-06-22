// To enter your birthday, your sex, where you're from, where do you live, and what language you speak
//Link: /basic-info

import { useState } from 'react';
import '../../auth/Auth.css';
import { useNavigate } from 'react-router-dom';
import useOnboarding from '../../../context/useOnboarding.jsx';

const defaultLanguages = [
  { label: '🇬🇧 English', value: 'en' }
];

const countryOptions = [
  { label: '🇺🇸 United States', value: 'USA' },
  { label: '🇨🇦 Canada', value: 'Canada' },
  { label: '🇫🇷 France', value: 'France' },
  { label: '🇸🇬 Singapore', value: 'Singapore' },
  { label: '🇪🇸 Spain', value: 'Spain' },
  { label: '🇻🇳 Vietnam', value: 'Vietnam' },
];

export default function BasicInfo() {
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [from, setFrom] = useState('');
    const [live, setLive] = useState('');
    const [religion, setReligion] = useState('');
    const [languages, setLanguages] = useState([]);

    const navigate = useNavigate();
    const { updateUserData } = useOnboarding();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!birthday || !gender) return alert("Birthday and gender are required.");
        updateUserData({
            birthday,
            gender,
            from,
            live,
            religion,
            languages: languages.map((lang) => lang.value),
        });
        navigate('/signup/welcome-to-app'); // Redirect to welcome screen after basic info
    };

    const toggleArrayItem = (array, item, setter) => {
        setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
    }

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
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                    </select>
                </label>
                <label>
                    Origin
                    <select value={from} onChange={(e) => setFrom(e.target.value)} required>
                        <option value="">Select your origin</option>
                        {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Base
                    <select value={live} onChange={(e) => setLive(e.target.value)} required>
                        <option value="">Select your location</option>
                        {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Religion
                    <input
                        type="text"
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        placeholder="Your religion (optional)"
                    />
                </label>
                <label>Languages you speak</label>
                    <div>
                    {defaultLanguages.map((lang) => (
                        <label key={lang.value} style={{ display: 'block', marginTop: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={languages.some(l => l.value === lang.value)}
                            onChange={() =>
                            toggleArrayItem(lang, languages, setLanguages)
                            }
                        />
                        {' '}{lang.label}
                        </label>
                    ))}
                    </div>
                <button type="submit" className='login-btn'>Next</button>
            </form>
        </div>
    );
}