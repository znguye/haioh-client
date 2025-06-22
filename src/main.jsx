import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import RoleProvider from '../context/RoleProvider.jsx';
import OnboardingProvider from '../context/OnboardingProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      </RoleProvider>
    </BrowserRouter>
  </StrictMode>
);
