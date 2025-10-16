import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  CheckBox,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface LeaveScreenProps {
  onBack: () => void;
  onApplyLeave: () => void;
}

const LeaveScreen: React.FC<LeaveScreenProps> = ({ onBack, onApplyLeave }) => {
  const [formData, setFormData] = useState({
    halfDay: false,
    leaveType: '',
    fromDate: '',
    toDate: '',
    email: '',
    reason: '',
  });

  const handleInputChange = (field: string, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyLeave = (): void => {
    console.log('Applying leave:', formData);
    onApplyLeave();
  };

  return (
    <SafeAreaView style={globalStyles.complaintContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      
      {/* Header */}
      <View style={globalStyles.complaintHeader}>
        <TouchableOpacity onPress={onBack} style={globalStyles.complaintBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={globalStyles.leaveTitle}>Apply Leave</Text>
        
        <TouchableOpacity onPress={handleApplyLeave} style={globalStyles.complaintSaveButton}>
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={globalStyles.complaintSaveText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <ScrollView style={globalStyles.leaveFormContent} showsVerticalScrollIndicator={false}>
        {/* Half Day Checkbox */}
        <View style={globalStyles.leaveCheckboxContainer}>
          <CheckBox
            value={formData.halfDay}
            onValueChange={(value) => handleInputChange('halfDay', value)}
            style={globalStyles.leaveCheckbox}
          />
          <Text style={globalStyles.leaveCheckboxLabel}>Half Day</Text>
        </View>

        {/* Leave Type Field */}
        <View style={globalStyles.leaveFieldContainer}>
          <Text style={globalStyles.leaveFieldLabel}>Leave Type</Text>
          <View style={globalStyles.leaveDropdownContainer}>
            <TextInput
              style={globalStyles.leaveDropdownInput}
              placeholder="Select Leave Type"
              value={formData.leaveType}
              onChangeText={(value) => handleInputChange('leaveType', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* From Date Field */}
        <View style={globalStyles.leaveFieldContainer}>
          <Text style={globalStyles.leaveFieldLabel}>From Date</Text>
          <TextInput
            style={globalStyles.leaveTextInput}
            placeholder="Select From Date"
            value={formData.fromDate}
            onChangeText={(value) => handleInputChange('fromDate', value)}
          />
        </View>

        {/* To Date Field */}
        <View style={globalStyles.leaveFieldContainer}>
          <Text style={globalStyles.leaveFieldLabel}>To date</Text>
          <TextInput
            style={globalStyles.leaveTextInput}
            placeholder="Select To Date"
            value={formData.toDate}
            onChangeText={(value) => handleInputChange('toDate', value)}
          />
        </View>

        {/* Email Field */}
        <View style={globalStyles.leaveFieldContainer}>
          <Text style={globalStyles.leaveFieldLabel}>Email</Text>
          <TextInput
            style={globalStyles.leaveTextInput}
            placeholder="Enter Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Reason Field */}
        <View style={globalStyles.leaveFieldContainer}>
          <Text style={globalStyles.leaveFieldLabel}>Reason</Text>
          <TextInput
            style={globalStyles.leaveTextInput}
            placeholder="Enter reason for leave"
            value={formData.reason}
            onChangeText={(value) => handleInputChange('reason', value)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Apply Leave Button */}
        <TouchableOpacity style={globalStyles.leaveApplyButton} onPress={handleApplyLeave}>
          <Text style={globalStyles.leaveApplyButtonText}>Apply Leave</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveScreen;
