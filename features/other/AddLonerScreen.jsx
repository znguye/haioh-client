import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/ui/navbars/TopNavBar.jsx';
import BottomNavBarMatchmaker from '../../components/ui/navbars/BottomNavBarMatchmaker.jsx';
import loner_fish from '../../components/ui/images/add_loner.png';
import './AddLonerScreen.css';

export default function AddLonerScreen() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate(`/dashboard/${input.toLowerCase()}`);
    }, 1500);
  };

  return (
    <div className="screen-container">
      <div className="top-nav-wrapper">
        <TopNavBar />
      </div>

      <div className="main-content add-loner-content">
        <img 
          src={loner_fish} 
          alt="Loner fish" 
          className="add-loner-image"
        />

        <h3 className="status">You don’t have any singleton to manage</h3>
        <p className="instructions">Add one to get started</p>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            placeholder="Enter their email or username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>

        {submitted && (
          <p className="confirmation">
            Invited <strong>{input}</strong>. Their profile can be published once they accept the invitation.
          </p>
        )}
      </div>

      <div className="bottom-nav-wrapper">
        <BottomNavBarMatchmaker />
      </div>
    </div>
  );
}
