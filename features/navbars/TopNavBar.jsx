import { Link } from "react-router-dom";
import SettingsDropdown from "../modals/SettingsDropdown";
import './TopNavBar.css';
// Using Loner fish image only
import LonerFish from "../../components/ui/images/Toggle_Loner.png";


export default function TopNavBar() {
  return (
    <div className="top-nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo-link">
          <span className="nav-title">Yakrush &nbsp;</span>
          <img
            src={LonerFish}
            alt="Yakrush Logo"
            style={{
              height: '100%',
              maxHeight: '54px',
              objectFit: 'contain',
              padding: '2px',
              cursor: 'default',
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