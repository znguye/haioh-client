import { Home, User, Heart, BookOpenCheck, SquareKanban } from "lucide-react";
import { Link } from "react-router-dom";
import './BottomNavbar.css';

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavItem icon={<Home size={22} />} alt="Home" to="/" />
      <NavItem icon={<User size={22} />} alt="Singleton Profile" to="/profile" />
      <NavItem icon={<Heart size={22} />} alt="Match List" to="/match-list" />
      <NavItem icon={<BookOpenCheck size={22} />} alt="Questionnaire" to="/feature-coming-soon" />
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
