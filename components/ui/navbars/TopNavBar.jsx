import { FishSymbol, Bell, MessageCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import './TopNavBar.css';

export default function TopNavBar() {
  return (
    <div className="top-nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo-link">
          <FishSymbol className="nav-icon" />
          <span className="nav-title">&nbsp; Yakrush</span>
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
