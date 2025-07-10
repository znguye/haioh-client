import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/authService";
import "./CreateProfileScreen.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function CreateProfileScreen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birthday: '',
    gender: '',
    from: '',
    photo: '',
    tagline: '',
    description: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (value) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ['first_name', 'username', 'birthday', 'gender'];
    for (let key of required) {
      if (!formData[key]) {
        setError(`Missing: ${key.replace('_', ' ')}`);
        return;
      }
    }

    try {
      const token = getToken();
      console.log('Token for profile creation:', token); // Debug log
      
      const response = await fetch(`${BASE_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          profilePicture: formData.photo, // set both photo + profilePicture
          status: 'published'
        })
      });

      if (!response.ok) {
        let errorMsg = '';
        try {
          const data = await response.json();
          errorMsg = data.message || JSON.stringify(data);
        } catch (err) {
          errorMsg = await response.text();
        }
        console.error('Profile creation error:', errorMsg);
        throw new Error(errorMsg || "Failed to create profile");
      }

      navigate("/all-set");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create Your Singleton's Profile</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>First Name
          <input name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>

        <label>Last Name
          <input name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>

        <label>Username
          <input name="username" value={formData.username} onChange={handleChange} required />
        </label>

        <label>Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>Birthday
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>

        <label>Gender</label>
        <div className="selection-group">
          {["male", "female", "non-binary"].map(g => (
            <button
              key={g}
              type="button"
              className={`selection-option ${formData.gender === g ? "selected" : ""}`}
              onClick={() => handleGenderSelect(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <label>From (City / Country)
          <input name="from" value={formData.from} onChange={handleChange} />
        </label>

        <label>Photo URL
          <input name="photo" value={formData.photo} onChange={handleChange} />
        </label>

        <label>Tagline
          <input name="tagline" value={formData.tagline} onChange={handleChange} maxLength={100} />
        </label>

        <label>Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1000}
          />
        </label>

        <button className="login-btn" type="submit">Publish Profile</button>
      </form>

    </div>
  );
}
