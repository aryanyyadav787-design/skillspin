import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { ProfileSetup } from './components/ProfileSetup';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [hasProfile, setHasProfile] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileData, setProfileData] = useState<any>(null);

  const handleLogin = () => {
    setShowAuth(true);
    setAuthMode('login');
  };

  const handleSignup = () => {
    setShowAuth(true);
    setAuthMode('signup');
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuth(false);
    // Show profile setup for new users (signup) or users without profile
    if (authMode === 'signup' || !hasProfile) {
      setShowProfileSetup(true);
    }
  };

  const handleBackToLanding = () => {
    setShowAuth(false);
  };

  const handleSwitchMode = (newMode: 'login' | 'signup') => {
    setAuthMode(newMode);
  };

  const handleProfileComplete = (data: any) => {
    setProfileData(data);
    setHasProfile(true);
    setShowProfileSetup(false);
    setUserName(data.fullName);
  };

  // Show auth page if authentication in progress
  if (!isLoggedIn && showAuth) {
    return <AuthPage mode={authMode} onBack={handleBackToLanding} onSuccess={handleAuthSuccess} onSwitchMode={handleSwitchMode} />;
  }

  // Show landing page if not logged in
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Show profile setup if logged in but no profile
  if (isLoggedIn && showProfileSetup) {
    return <ProfileSetup initialName={userName} onComplete={handleProfileComplete} />;
  }

  // Main app - user is logged in and has completed profile
  return (
    <Dashboard
      profileData={profileData}
      onEditProfile={() => setShowProfileSetup(true)}
      onLogout={() => {
        setIsLoggedIn(false);
        setHasProfile(false);
        setProfileData(null);
      }}
    />
  );
};

export default App;
