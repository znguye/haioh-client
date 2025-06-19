import { Home, Swords, Heart, User } from "lucide-react";
import './BottomNavBar.css';

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavItem icon={<Heart size={22} />} a="Matches" />
      <NavItem icon={<Home size={22} />} a="Home" />
      <NavItem icon={<Swords size={22} />} a="Challenges" />
      <NavItem icon={<User size={22} />} a="Profile" />
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
