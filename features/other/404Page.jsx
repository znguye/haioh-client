import loner_fish from '../../components/ui/images/funny-red-fish.png';
import './MissingFeatureScreen.css';
// import { useNavigate } from 'react-router-dom';


export default function AddLonerScreen() {
//   const navigate = useNavigate();

  return (
    <div className="screen-container">
      <div className="main-content add-loner-content">
        <img 
          src={loner_fish} 
          alt="Loner fish" 
          className="add-loner-image"
        />

        <h3 className="status">404</h3>
        <p className="instructions">Oops... this page didn’t get matched.</p>

        {/* <button className="submit-btn" onClick={() => navigate('/')}>
          Let's go!
        </button> */}


      </div>
    </div>
  );
}
