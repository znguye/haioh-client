import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import useRole from "../context/useRole.jsx";
import {useState} from "react";

//Login Screens
import LoginScreen from "../features/auth/Login/LoginScreen.jsx";
// import SignupScreen from "../features/auth/Signup/SignupScreen.jsx";

//Loner Screens
import LonerHomeScreen from "../features/loner/screens/LonerHomeScreen.jsx"
import LonerProfile from "../features/loner/screens/LonerProfile.jsx";

//Matchmaker Screens
import MatchmakerHomeScreen from "../features/matchmaker/screens/MatchmakerHomeScreen.jsx";
import CreateProfileScreen from "../features/matchmaker/screens/CreateProfileScreen.jsx";
import MatchmakerAdminScreen from "../features/matchmaker/screens/MatchmakerAdminScreen.jsx";

export default function App() {
  const { role } = useRole();
  console.log("Current role:", role);

  const [user, setUser] = useState(null);
  const location = useLocation();

  // Always allow auth
  if (location.pathname === '/auth') {
    return <LoginScreen setUser={setUser} />;
  }

  // Redirect to login if no user is set and not on the login page
  if (!user && location.pathname !== '/login') {
    return (
      <Routes>
        <Route path="/auth" element={<LoginScreen onLogin={setUser} />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  // Add a loading fallback while role is being retrieved
  if (!role) return <div>Loading...</div>;

  return (
    <>
      <Routes key={role}>
        {role === 'loner' ? (
          <>
            <Route path="/" element={<LonerHomeScreen />} />
            <Route path="/profile" element={<LonerProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<MatchmakerHomeScreen />} />
            <Route path="/create-profile" element={<CreateProfileScreen />} />
            <Route path="/admin" element={<MatchmakerAdminScreen />} />
          </>
        )}
      </Routes>
    </>
  );
}