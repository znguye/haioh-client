import { FishSymbol, Bell, MessageCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import './TopNavBar.css';
import LonerFish from "../images/Toggle_Loner.png";
import MatchMakerFish from "../images/Toggle_MatchMaker.png";
import {useState, useEffect} from "react";

export default function TopNavBar() {
    // State to manage the toggle between Loner and MatchMaker
    const [role, setRole] = useState('loner');

    // Effect to load the role from localStorage on component mount
    useEffect(() => {
        const storedRole = localStorage.getItem('yakrush-role');
        if (storedRole === 'loner' || storedRole === 'matchmaker') {
            setRole(storedRole);
        }
    }, []);

    // Function to toggle the role and save the role in localStorage
    const toggleRole = () => {
        const newRole = role === 'loner' ? 'matchmaker' : 'loner';
        setRole(newRole);
        localStorage.setItem('yakrush-role', newRole);
    };


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
                        maxHeight: '54px', // safety cap
                        objectFit: 'contain',
                        padding: '2px',     // optional
                        cursor: 'pointer',
                }}
            />

        </Link>
      </div>
      <div className="nav-right">
        <Bell className="nav-icon" />
        <MessageCircle className="nav-icon" />
        <ChevronDown className="nav-icon-small" />
      </div>
    </div>
  );
}
