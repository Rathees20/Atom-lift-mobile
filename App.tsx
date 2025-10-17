import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

  const AppContent = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3498db' }}>
      <StatusBar 
        style="light" 
        backgroundColor="#3498db"
        translucent={Platform.OS === 'android'}
      />
      {isLoggedIn ? (
        <HomeScreen 
          onLogout={handleLogout} 
          mobileNumber={mobileNumber} 
        />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
