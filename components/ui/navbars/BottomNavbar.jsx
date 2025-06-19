import { Home, Swords, Heart, User } from "lucide-react";

export default function BottomNavBar(){
    return(
        <nav className="flex items-center justify-around text-gray-600 bg-white h-14">
            <NavItem icon={<Heart size={22} />} a="Matches" />
            <NavItem icon={<Home size={22} />} a="Home" />
            <NavItem icon={<Swords size={22} />} a="Challenges" />
            <NavItem icon={<User size={22} />} a="Profile" />
        </nav>
    )
}

function NavItem({ icon, label }) {
  return (
    <button className="flex flex-col items-center text-xs transition-colors hover:text-black">
      {icon}
      <span>{label}</span>
    </button>
  );
}