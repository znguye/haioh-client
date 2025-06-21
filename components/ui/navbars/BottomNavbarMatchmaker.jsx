import { Home, User, Search, BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import './BottomNavBar.css';

export default function BottomNavBarMatchmaker() {
  return (
    <nav className="bottom-nav">
      <NavItem icon={<Home size={22} />} a="Home" Link to="/" />
      <NavItem icon={<Search size={22} />} a="Search" to="/search" />
      <NavItem icon={<User size={22} />} a="Profile" Link to="/profile" />
      <NavItem icon={<BookOpenCheck size={22} />} a="Questionaire" to="/questionaire" />
    </nav>
  );
}

function NavItem({ icon, label, to }) {
  return (
    <Link to={to} className="nav-item">
      {icon}
      <span>{label}</span>
    </Link>
  );
}