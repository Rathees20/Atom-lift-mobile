import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LoginScreenProps } from '../../types';
import { globalStyles } from '../styles/globalStyles';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(true);

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const sendOTP = async (): Promise<void> => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtpTimer(60); // 60 seconds timer
      setCanResendOtp(false);
      Alert.alert('Success', `OTP sent to +91${mobileNumber}`);
    }, 1000);
  };

  const verifyOTP = async (): Promise<void> => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6) {
        onLogin(mobileNumber);
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    }, 1000);
  };

  const resendOTP = async (): Promise<void> => {
    if (!canResendOtp) {
      Alert.alert('Info', `Please wait ${otpTimer} seconds before resending OTP`);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpTimer(60);
      setCanResendOtp(false);
      Alert.alert('Success', `OTP resent to +91${mobileNumber}`);
    }, 1000);
  };

  return (
    <SafeAreaView style={globalStyles.loginContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.loginKeyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={globalStyles.loginContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={globalStyles.loginHeader}>
            <Text style={globalStyles.loginTitle}>Welcome Back</Text>
            <Text style={globalStyles.loginSubtitle}>Sign in to your account</Text>
          </View>

          <View style={globalStyles.loginForm}>
            {!isOtpSent ? (
              <>
                <View style={globalStyles.loginInputContainer}>
                  <Ionicons name="call-outline" size={20} color="#666" style={globalStyles.loginInputIcon} />
              <TextInput
                    style={globalStyles.loginInput}
                    placeholder="Mobile Number"
                placeholderTextColor="#999"
                    value={mobileNumber}
                    onChangeText={(text: string) => setMobileNumber(text.replace(/\D/g, '').slice(0, 10))}
                    keyboardType="phone-pad"
                    maxLength={10}
              />
            </View>

                <TouchableOpacity style={globalStyles.loginButton} onPress={sendOTP} disabled={isLoading}>
                  <Text style={globalStyles.loginButtonText}>
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={globalStyles.loginMobileNumberDisplay}>
                  <Text style={globalStyles.loginMobileNumberText}>+91 {mobileNumber}</Text>
                  <TouchableOpacity onPress={() => setIsOtpSent(false)}>
                    <Text style={globalStyles.loginChangeNumberText}>Change</Text>
              </TouchableOpacity>
            </View>

                <View style={globalStyles.loginInputContainer}>
                  <Ionicons name="keypad-outline" size={20} color="#666" style={globalStyles.loginInputIcon} />
                  <TextInput
                    style={globalStyles.loginInput}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#999"
                    value={otp}
                    onChangeText={(text: string) => setOtp(text.replace(/\D/g, '').slice(0, 6))}
                    keyboardType="number-pad"
                    maxLength={6}
                    textAlign="center"
                  />
                </View>

                <TouchableOpacity style={globalStyles.loginButton} onPress={verifyOTP} disabled={isLoading}>
                  <Text style={globalStyles.loginButtonText}>
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Text>
            </TouchableOpacity>

                <View style={globalStyles.loginResendContainer}>
                  {otpTimer > 0 ? (
                    <Text style={globalStyles.loginTimerText}>
                      Resend OTP in {otpTimer}s
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={resendOTP} disabled={isLoading}>
                      <Text style={globalStyles.loginResendText}>Resend OTP</Text>
            </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
