import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface AddComplaintScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const AddComplaintScreen: React.FC<AddComplaintScreenProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    type: '',
    customerSite: '',
    amc: '',
    customerName: '',
    customerMobile: '',
    wing: '',
    assign: '',
    priority: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (): void => {
    console.log('Saving complaint:', formData);
    onSave();
  };

  return (
    <SafeAreaView style={globalStyles.complaintContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      
      {/* Header */}
      <View style={globalStyles.complaintHeader}>
        <TouchableOpacity onPress={onBack} style={globalStyles.complaintBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSave} style={globalStyles.complaintSaveButton}>
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={globalStyles.complaintSaveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <ScrollView style={globalStyles.complaintContent} showsVerticalScrollIndicator={false}>
        {/* Type Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Type:</Text>
          <View style={globalStyles.complaintDropdownContainer}>
            <TextInput
              style={globalStyles.complaintDropdownInput}
              placeholder="Select Type"
              value={formData.type}
              onChangeText={(value) => handleInputChange('type', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* Customer Site Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Customer Site:</Text>
          <View style={globalStyles.complaintDropdownContainer}>
            <TextInput
              style={globalStyles.complaintDropdownInput}
              placeholder="Select Customer Site"
              value={formData.customerSite}
              onChangeText={(value) => handleInputChange('customerSite', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* AMC Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>AMC:</Text>
          <View style={globalStyles.complaintDropdownContainer}>
            <TextInput
              style={globalStyles.complaintDropdownInput}
              placeholder="Select AMC"
              value={formData.amc}
              onChangeText={(value) => handleInputChange('amc', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* Customer Name Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Customer Name</Text>
          <TextInput
            style={globalStyles.complaintTextInput}
            placeholder="Enter Customer Name"
            value={formData.customerName}
            onChangeText={(value) => handleInputChange('customerName', value)}
          />
        </View>

        {/* Customer Mobile Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Customer Mobile No.</Text>
          <TextInput
            style={globalStyles.complaintTextInput}
            placeholder="Enter Mobile Number"
            value={formData.customerMobile}
            onChangeText={(value) => handleInputChange('customerMobile', value)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Wing Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Wing</Text>
          <TextInput
            style={globalStyles.complaintTextInput}
            placeholder="Enter Wing"
            value={formData.wing}
            onChangeText={(value) => handleInputChange('wing', value)}
          />
        </View>

        {/* Assign Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Assign:</Text>
          <View style={globalStyles.complaintDropdownContainer}>
            <TextInput
              style={globalStyles.complaintDropdownInput}
              placeholder="Select Assignee"
              value={formData.assign}
              onChangeText={(value) => handleInputChange('assign', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* Priority Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Priority:</Text>
          <View style={globalStyles.complaintDropdownContainer}>
            <TextInput
              style={globalStyles.complaintDropdownInput}
              placeholder="Select Priority"
              value={formData.priority}
              onChangeText={(value) => handleInputChange('priority', value)}
            />
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>

        {/* Subject Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Subject</Text>
          <TextInput
            style={globalStyles.complaintTextInput}
            placeholder="Enter Subject"
            value={formData.subject}
            onChangeText={(value) => handleInputChange('subject', value)}
          />
        </View>

        {/* Message Field */}
        <View style={globalStyles.complaintFieldContainer}>
          <Text style={globalStyles.complaintFieldLabel}>Message</Text>
          <TextInput
            style={globalStyles.complaintMessageInput}
            placeholder="Enter your message here..."
            value={formData.message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddComplaintScreen;
