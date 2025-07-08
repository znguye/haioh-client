import { Link } from "react-router-dom";
import SettingsDropdown from "../modals/SettingsDropdown";
import './TopNavBar.css';

// Import images for the role toggle
import useRole from "../../../context/useRole";
import LonerFish from "../images/Toggle_Loner.png";
import MatchMakerFish from "../images/Toggle_MatchMaker.png";


export default function TopNavBar() {
    // Use the context component instead of state
    const {role, toggleRole} = useRole();

  return (
    <div className="top-nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo-link">
          <span className="nav-title">Yakrush &nbsp; </span> 

          {/* Determine the image source based on the current role */}
            <img
                src={role === 'loner' ? LonerFish : MatchMakerFish}
                alt="Role Toggle"
                onClick={toggleRole}
                style={{  
                        height: '100%',
                        maxHeight: '54px', 
                        objectFit: 'contain',
                        padding: '2px',
                        cursor: 'pointer',
                }}
            />

        </Link>
      </div>
      <div className="nav-right">
        <SettingsDropdown />
      </div>
    </div>
  );
}
