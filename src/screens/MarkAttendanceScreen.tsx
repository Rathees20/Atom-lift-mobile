import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface MarkAttendanceScreenProps {
  onBack: () => void;
}

const MarkAttendanceScreen: React.FC<MarkAttendanceScreenProps> = ({ onBack }) => {
  const [isSelfieTaken, setIsSelfieTaken] = useState<boolean>(false);

  const handleTakeSelfie = (): void => {
    console.log('Take selfie pressed');
    // In a real app, this would open the camera
    // For now, we'll simulate taking a selfie
    Alert.alert(
      'Selfie Taken',
      'Selfie has been captured successfully!',
      [
        {
          text: 'OK',
          onPress: () => setIsSelfieTaken(true),
        },
      ]
    );
  };

  const handleSubmit = (): void => {
    if (!isSelfieTaken) {
      Alert.alert(
        'Selfie Required',
        'Please take a selfie before submitting attendance.',
        [{ text: 'OK' }]
      );
      return;
    }

    console.log('Submit attendance pressed');
    Alert.alert(
      'Attendance Marked',
      'Your attendance has been marked successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsSelfieTaken(false);
            onBack(); // Go back to home screen
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.markAttendanceContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      
      {/* Header */}
      <View style={globalStyles.markAttendanceHeader}>
        <TouchableOpacity onPress={onBack} style={globalStyles.markAttendanceBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={globalStyles.markAttendanceTitle}>Mark attendance</Text>
        <View style={globalStyles.markAttendanceHeaderSpacer} />
      </View>

      {/* Main Content */}
      <View style={globalStyles.markAttendanceContent}>
        {/* Camera Preview Area */}
        <View style={globalStyles.markAttendanceCameraPreview}>
          <Text style={globalStyles.markAttendancePreviewText}>
            {isSelfieTaken ? 'SELFIE CAPTURED' : 'NO PREVIEW AVAILABLE'}
          </Text>
          {isSelfieTaken && (
            <View style={globalStyles.markAttendanceSuccessIcon}>
              <Ionicons name="checkmark-circle" size={48} color="#27ae60" />
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={globalStyles.markAttendanceButtons}>
          <TouchableOpacity
            style={[
              globalStyles.markAttendanceTakeSelfieButton,
              isSelfieTaken && globalStyles.markAttendanceButtonDisabled
            ]}
            onPress={handleTakeSelfie}
            disabled={isSelfieTaken}
          >
            <Text style={globalStyles.markAttendanceButtonText}>
              {isSelfieTaken ? 'Selfie Taken' : 'Take selfie'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              globalStyles.markAttendanceSubmitButton,
              !isSelfieTaken && globalStyles.markAttendanceButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!isSelfieTaken}
          >
            <Text style={globalStyles.markAttendanceButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MarkAttendanceScreen;
