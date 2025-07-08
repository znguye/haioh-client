import { Home, User, Search, BookOpenCheck, SquareKanban } from "lucide-react";
import { Link } from "react-router-dom";
import './BottomNavBar.css';

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavItem icon={<Home size={22} />} alt="Home" Link to="/" />
      <NavItem icon={<Search size={22} />} alt="Search" to="/feature-coming-soon" />
      <NavItem icon={<User size={22} />} alt="Profile" Link to="/create-profile/:username" />
      <NavItem icon={<SquareKanban size={22} />} alt="Dashboard" to="/dashboard/:username" />
      <NavItem icon={<BookOpenCheck size={22} />} alt="Questionaire" to="/feature-coming-soon"  />
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