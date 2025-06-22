// This page details how we handle the onboarding flow for new users, including entering their name, basic info, and selecting their role.

import { Routes, Route } from 'react-router-dom';
import SignUpScreen from './SignUpScreen';
import EnterYourName from './EnterYourName';
import BasicInfo from './BasicInfo';
import WelcomeToApp from './WelcomeToApp';
import { Navigate } from 'react-router-dom';

export default function OnboardingFlow() {
    // Inside a component like "/signup", the child route must be relative, not a full path
  return (
    <Routes>
      <Route path="/" element={<SignUpScreen />} />
      <Route path="name" element={<EnterYourName />} />
      <Route path="basic-info" element={<BasicInfo />} />
      <Route path="welcome-to-app" element={<WelcomeToApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

