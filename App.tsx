import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleLogin = (mobile: string) => {
    setMobileNumber(mobile);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setMobileNumber('');
    setIsLoggedIn(false);
  };

  return (
    <>
      <StatusBar 
        style="light" 
        backgroundColor="#3498db"
        translucent={false}
      />
      {isLoggedIn ? (
        <HomeScreen 
          onLogout={handleLogout} 
          mobileNumber={mobileNumber} 
        />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </>
  );
}
