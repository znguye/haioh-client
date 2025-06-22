import { useContext } from 'react';
import OnboardingContext from "./OnboardingContext.jsx";
export default function useOnboarding() {
    return useContext(OnboardingContext);
}