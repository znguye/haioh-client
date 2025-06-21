import {Routes, Route} from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";

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

  return (
    <>
      <Routes>
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