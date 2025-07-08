import loner_fish from '../../components/ui/images/add_loner.png';
import './AddLonerScreen.css';
import { useNavigate } from 'react-router-dom';


export default function AddLonerScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen-container">
      <div className="main-content add-loner-content">
        <img 
          src={loner_fish} 
          alt="Loner fish" 
          className="add-loner-image"
        />

        <h3 className="status">You're all set</h3>
        <p className="instructions">Your singleton's profile is now published</p>

        <button className="submit-btn" onClick={() => navigate('/')}>
          Let's go!
        </button>


      </div>
    </div>
  );
}
