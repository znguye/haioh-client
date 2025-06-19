import { Smile, Bell, MessageCircle, ChevronDown } from "lucide-react";
import './TopNavBar.css';

export default function TopNavBar() {
  return (
    <div className="top-nav">
      <div className="nav-left">
        <Smile className="nav-icon" />
        <span className="nav-title">haioh</span>
      </div>
      <div className="nav-right">
        <Bell className="nav-icon" />
        <MessageCircle className="nav-icon" />
        <ChevronDown className="nav-icon-small" />
      </div>
    </div>
  );
}
