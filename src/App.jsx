import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import useRole from "../context/useRole.jsx";
import {useState} from "react";

// Auth Screens
import AuthLandingScreen from "../features/auth/Login/AuthLandingScreen.jsx";
import LoginScreen from "../features/auth/Login/LoginScreen.jsx";

// Onboarding Screens
import OnboardingFlow from "../features/auth/Signup/OnboardingFlow.jsx";
import SignUpScreen from "../features/auth/Signup/SignUpScreen.jsx";
import EnterYourName from "../features/auth/Signup/EnterYourName.jsx";
import BasicInfo from "../features/auth/Signup/BasicInfo.jsx";
import WelcomeToApp from "../features/auth/Signup/WelcomeToApp.jsx";

//Loner Screens
import LonerHomeScreen from "../features/loner/screens/LonerHomeScreen.jsx"
import LonerProfile from "../features/loner/screens/LonerProfile.jsx";

//Matchmaker Screens
import MatchmakerHomeScreen from "../features/matchmaker/screens/MatchmakerHomeScreen.jsx";
import CreateProfileScreen from "../features/matchmaker/screens/CreateProfileScreen.jsx";
import MatchmakerAdminScreen from "../features/matchmaker/screens/MatchmakerAdminScreen.jsx";

//Missing feature screen
import MissingFeatureScreen from "../features/other/MissingFeatureScreen.jsx";

export default function App() {
  const { role } = useRole();
  const location = useLocation();
  // const [user, setUser] = useState(null);

// Test main pages
  const [user, setUser] = useState(() => {
  // Bypass login for development
  return { email: "mock@example.com" };
});

// Redirect unauthenticated users to auth page
if (!user && !location.pathname.startsWith("/signup") && location.pathname !== "/login" && location.pathname !== "/auth") {
  return <Navigate to="/auth" replace />;
}

// If user is not logged in, show auth routes
if (!user) {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLandingScreen />} />
      <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
      
      <Route path="/signup" element={<OnboardingFlow />}>
          <Route index element={<SignUpScreen />} />
          <Route path="name" element={<EnterYourName />} />
          <Route path="basic-info" element={<BasicInfo />} />
          <Route path="welcome-to-app" element={<WelcomeToApp />} />
        </Route>

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
        {/* <Route path="/signup/" element={<OnboardingFlow setUser={setUser} />} /> */}
        <Route path="*" element={<Navigate to="/auth" replace />} />


        {/* Protected role-based routes */}
        {user ? (
          role === "matchmaker" ? (
            <>
              <Route path="/" element={<MatchmakerHomeScreen />} />
              <Route path="/create-profile" element={<CreateProfileScreen />} />
              <Route path="/dashboard" element={<MatchmakerAdminScreen />} />
              <Route path="/feature-coming-soon" element={<MissingFeatureScreen />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LonerHomeScreen />} />
              <Route path="/profile" element={<LonerProfile />} />
              <Route path="/feature-coming-soon" element={<MissingFeatureScreen />} />
            </>
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}