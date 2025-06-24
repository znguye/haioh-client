import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import useRole from "../context/useRole.jsx";
import {useState} from "react";

// Auth Screens
import AuthLandingScreen from "../features/auth/Login/AuthLandingScreen.jsx";
import LoginScreen from "../features/auth/Login/LoginScreen.jsx";
import OnboardingFlow from "../features/auth/Signup/OnboardingFlow.jsx";

//Loner Screens
import LonerHomeScreen from "../features/loner/screens/LonerHomeScreen.jsx"
import LonerProfile from "../features/loner/screens/LonerProfile.jsx";

//Matchmaker Screens
import MatchmakerHomeScreen from "../features/matchmaker/screens/MatchmakerHomeScreen.jsx";
import CreateProfileScreen from "../features/matchmaker/screens/CreateProfileScreen.jsx";
import MatchmakerAdminScreen from "../features/matchmaker/screens/MatchmakerAdminScreen.jsx";

export default function App() {
  const { role } = useRole();
  const location = useLocation();
  const [user, setUser] = useState(null);

// Test main pages
//   const [user, setUser] = useState(() => {
//   // Bypass login for development
//   return { email: "mock@example.com" };
// });

// Redirect unauthenticated users to auth page
if (!user && !["/login", "/signup", "/auth"].includes(location.pathname)) {
  return <Navigate to="/auth" replace />;
}

// If user is not logged in, show auth routes
if (!user) {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLandingScreen />} />
      <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
      <Route path="/signup/*" element={<OnboardingFlow setUser={setUser} />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

  // Add a loading fallback while role is being retrieved
  if (!role) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
        <Route path="/signup/*" element={<OnboardingFlow setUser={setUser} />} />

        {/* Protected role-based routes */}
        {user ? (
          role === "loner" ? (
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
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}