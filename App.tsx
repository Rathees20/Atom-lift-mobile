import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userMobileNumber, setUserMobileNumber] = useState<string>('');

  useEffect(() => {
    // Check if user is already logged in from localStorage (for web) or sessionStorage
    checkLoginStatus();
  }, []);

  const checkLoginStatus = (): void => {
    try {
      // Try localStorage first (for web), then sessionStorage
      const loginStatus = localStorage?.getItem('isLoggedIn') || sessionStorage?.getItem('isLoggedIn');
      const mobileNumber = localStorage?.getItem('userMobileNumber') || sessionStorage?.getItem('userMobileNumber');
      if (loginStatus === 'true') {
        setIsLoggedIn(true);
        if (mobileNumber) {
          setUserMobileNumber(mobileNumber);
        }
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (mobileNumber: string): void => {
    try {
      // Save to both localStorage and sessionStorage for persistence
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userMobileNumber', mobileNumber);
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userMobileNumber', mobileNumber);
      }
      setUserMobileNumber(mobileNumber);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error saving login status:', error);
    }
  };

  const handleLogout = (): void => {
    try {
      // Remove from both localStorage and sessionStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userMobileNumber');
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userMobileNumber');
      }
      setUserMobileNumber('');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing login status:', error);
    }
  };

  // Show loading screen while checking login status
  if (isLoading) {
    return <></>; // Empty fragment while loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} onLogout={handleLogout} mobileNumber={userMobileNumber} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
