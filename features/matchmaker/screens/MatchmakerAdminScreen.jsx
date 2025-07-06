//Thoughts: conditionally render the LonerDashboardScreen based on the status of the matchmaker <> loner relationship.

import { useParams } from 'react-router-dom';
import LonerDashboardScreen from '../../other/LonerDashboardScreen';
import AddLonerScreen from '../../other/AddLonerScreen';

{/* <Route path="/matchmaker/:username" element={<LonerDashboardScreen />} /> */}

export default function MatchmakerAdminScreen() {
  const { username } = useParams();

  // Simulated lookup: Valerie has accepted
  const acceptedUsernames = ['iced_watermelon'];
  
  //Simulated lookup: no one else has accepted
  // const acceptedUsernames = [];

  const hasAccepted = acceptedUsernames.includes(username?.toLowerCase());

  return hasAccepted? (
    <LonerDashboardScreen username={username} />
  ) : (
    <AddLonerScreen username={username} />
  );
}