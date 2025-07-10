import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

// Auth Screens
import AuthLandingScreen from "../features/auth/Login/AuthLandingScreen.jsx";
import LoginScreen from "../features/auth/Login/LoginScreen.jsx";
import SignUpScreen from "../features/auth/Login/SignUpScreen.jsx";

// Loner Sign up Screens
import AddLonerScreen from "../features/SignLonerUp/AddLonerScreen.jsx";
import CreateProfileScreen from "../features/SignLonerUp/CreateProfileScreen.jsx";
import AllSetScreen from "../features/SignLonerUp/AllSetScreen.jsx";

//Main screens
import MatchmakerHomeScreen from "../features/screens/MatchmakerHomeScreen.jsx";
import LonerPublicProfile from "../features/screens/LonerPublicProfile.jsx";
import MatchListScreen from "../features/screens/MatchListScreen.jsx";

//Missing feature screen
import MissingFeatureScreen from "../features/other/MissingFeatureScreen.jsx";
import PublicProfilePage from "../features/card/PublicProfilePage.jsx";

// Not found screen
import NotFoundScreen from "../features/other/404Page.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // // Test main pages
  // const [user, setUser] = useState(() => {
  //   return { email: "mock@example.com" };
  // });

  // Unauthenticated users must go to auth/signup
  if (
    !user &&
    !location.pathname.startsWith("/signup") &&
    location.pathname !== "/login" &&
    location.pathname !== "/auth"
  ) {
    return <Navigate to="/auth" replace />;
  }

  // Auth + Signup Flow
  console.log("User state:", user);
  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthLandingScreen />} />
        <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
        <Route path="/signup" element={<SignUpScreen onSignUp={setUser} />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  // Logged-in user flow
  return (
    <Routes>
      <Route path="/" element={<MatchmakerHomeScreenWithNav onLogout={handleLogout} />} />
      <Route path="/add-loner" element={<AddLonerScreen />} />
      <Route path="/create-profile" element={<CreateProfileScreen />} />
      <Route path="/all-set" element={<AllSetScreen />} />
      <Route path="/profiles" element={<LonerPublicProfile />} />
      <Route path="/match-list" element={<MatchListScreen />} />
      <Route path="/profiles/:username" element={<PublicProfilePage />} />
      <Route path="/feature-coming-soon" element={<MissingFeatureScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

// Helper HOC to inject onLogout into MatchmakerHomeScreen
function MatchmakerHomeScreenWithNav({ onLogout }) {
  return <MatchmakerHomeScreen onLogout={onLogout} />;
}