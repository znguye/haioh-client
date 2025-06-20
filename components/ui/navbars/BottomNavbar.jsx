import { Home, Swords, Heart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import './BottomNavBar.css';

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavItem icon={<Home size={22} />} a="Home" to="/" />
      <NavItem icon={<Heart size={22} />} a="Matches" to="/matches" />
      <NavItem icon={<Search size={22} />} a="Search" to="/search" />
      <NavItem icon={<Swords size={22} />} a="Challenges" to="/challenges" />
      <NavItem icon={<User size={22} />} a="Profile" to="/profile" />
    </nav>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="nav-item">
      {icon}
      <span>{label}</span>
    </button>
  );
}
