import { useState } from 'react';
import OnboardingContext from './OnboardingContext.jsx';

export default function OnboardingProvider({ children }) {
  const [userData, setUserData] = useState({});

  const updateUserData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ userData, updateUserData }}>
      {children}
    </OnboardingContext.Provider>
  );
}