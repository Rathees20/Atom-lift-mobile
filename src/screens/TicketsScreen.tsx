import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface TicketsScreenProps {
  onBack: () => void;
}

interface TicketItem {
  id: number;
  title: string;
  dateTime: string;
  status: string;
  ticketId: string;
  amcType: string;
  siteAddress: string;
  mobileNumber: string;
  coordinates?: string;
}

const TicketsScreen: React.FC<TicketsScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [expandedTickets, setExpandedTickets] = useState<Set<number>>(new Set());

  const ticketItems: TicketItem[] = [
    {
      id: 1,
      title: 'Anna nagar 2 - Mr.Agathian',
      dateTime: '09 Oct, 2025 13:06:00',
      status: 'open',
      ticketId: '701',
      amcType: 'ATOM - FREE AMC',
      siteAddress: 'Kumarasamy nagar street sector agathiyar nagar villivakkam. chennai. 600049. Tamil Nadu. India',
      mobileNumber: '(null)',
    },
    {
      id: 2,
      title: 'KEELKATTALAI 4 - PRAVEEN',
      dateTime: '09 Oct, 2025 13:06:00',
      status: 'open',
      ticketId: '701',
      amcType: 'ATOM - FREE AMC',
      siteAddress: 'Kumarasamy nagar street sector agathiyar nagar villivakkam. chennai. 600049. Tamil Nadu. India',
      mobileNumber: '9894817942 (null)',
      coordinates: '12.952751 80.184678. Tamil Nadu',
    },
    {
      id: 3,
      title: 'KK Nagar 2 - Mr.Ravi Shankar',
      dateTime: '08 Oct, 2025 14:30:00',
      status: 'in progress',
      ticketId: '702',
      amcType: 'STANDARD AMC',
      siteAddress: 'KK Nagar, Chennai, Tamil Nadu, India',
      mobileNumber: '9876543210 (null)',
    },
    {
      id: 4,
      title: 'T. Nagar 1 - Ms.Priya',
      dateTime: '07 Oct, 2025 10:15:00',
      status: 'closed',
      ticketId: '703',
      amcType: 'PREMIUM AMC',
      siteAddress: 'T. Nagar, Chennai, Tamil Nadu, India',
      mobileNumber: '9123456789 (null)',
    },
    {
      id: 5,
      title: 'Velachery 3 - Mr.Kumar',
      dateTime: '06 Oct, 2025 16:45:00',
      status: 'open',
      ticketId: '704',
      amcType: 'BASIC AMC',
      siteAddress: 'Velachery, Chennai, Tamil Nadu, India',
      mobileNumber: '(null)',
    },
  ];

  const handleItemPress = (item: TicketItem): void => {
    console.log(`Pressed Ticket: ${item.title}`);
    // Add navigation logic here for ticket details
  };

  const handleExpandPress = (ticketId: number): void => {
    const newExpanded = new Set(expandedTickets);
    if (newExpanded.has(ticketId)) {
      newExpanded.delete(ticketId);
    } else {
      newExpanded.add(ticketId);
    }
    setExpandedTickets(newExpanded);
  };

  const handleSearchPress = (): void => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      setSearchQuery('');
    }
  };

  const handleGoToDetails = (item: TicketItem): void => {
    console.log(`Go to details for ticket: ${item.ticketId}`);
    // Add navigation logic here
  };

  const handleAssign = (item: TicketItem): void => {
    console.log(`Assign ticket: ${item.ticketId}`);
    // Add assignment logic here
  };

  const filteredTickets = ticketItems.filter((item) => {
    const searchText = `${item.title} ${item.ticketId} ${item.status} ${item.amcType}`.toLowerCase();
    return searchText.includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'open': return '#e67e22'; // Orange
      case 'in progress': return '#3498db'; // Blue
      case 'closed': return '#27ae60'; // Green
      default: return '#7f8c8d'; // Gray
    }
  };

  return (
    <SafeAreaView style={globalStyles.ticketsContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      
      {/* Header */}
      <View style={globalStyles.ticketsHeader}>
        <TouchableOpacity onPress={onBack} style={globalStyles.ticketsBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={globalStyles.ticketsTitle}>Tickets</Text>
        <View style={globalStyles.ticketsHeaderActions}>
          <TouchableOpacity style={globalStyles.ticketsSearchButton} onPress={handleSearchPress}>
            <Ionicons name={showSearchInput ? "close" : "search"} size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.ticketsFilterButton}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input */}
      {showSearchInput && (
        <View style={globalStyles.ticketsSearchContainer}>
          <TextInput
            style={globalStyles.ticketsSearchInput}
            placeholder="Search tickets..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </View>
      )}

      {/* Content */}
      <ScrollView style={globalStyles.ticketsContent} showsVerticalScrollIndicator={false}>
        {filteredTickets.map((item) => (
          <View key={item.id} style={globalStyles.ticketsItem}>
            {/* Main Ticket Row */}
            <TouchableOpacity
              style={globalStyles.ticketsMainRow}
              onPress={() => handleExpandPress(item.id)}
            >
              <View style={globalStyles.ticketsMainRowLeft}>
                <View style={globalStyles.ticketsNotificationIcon}>
                  <Ionicons name="notifications-outline" size={20} color="#3498db" />
                </View>
                <View style={globalStyles.ticketsMainRowContent}>
                  <Text style={globalStyles.ticketsTitleText}>{item.title}</Text>
                  <Text style={[globalStyles.ticketsDateTimeText, { color: getStatusColor(item.status) }]}>
                    {item.dateTime} ({item.status})
                  </Text>
                </View>
              </View>
              <Ionicons 
                name={expandedTickets.has(item.id) ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#2c3e50" 
              />
            </TouchableOpacity>

            {/* Expanded Details */}
            {expandedTickets.has(item.id) && (
              <View style={globalStyles.ticketsExpandedContent}>
                <Text style={globalStyles.ticketsDetailText}>
                  {item.ticketId} # Created at {item.dateTime} # Assign at
                </Text>
                <Text style={globalStyles.ticketsDetailText}>
                  # AMC Type : {item.amcType}, Site Address: {item.siteAddress}
                </Text>
                {item.coordinates && (
                  <Text style={globalStyles.ticketsDetailText}>
                    {item.coordinates}
                  </Text>
                )}
                <Text style={globalStyles.ticketsDetailText}>
                  Mo No.: {item.mobileNumber}
                </Text>
                
                {/* Action Buttons */}
                <View style={globalStyles.ticketsActionButtons}>
                  <TouchableOpacity
                    style={globalStyles.ticketsGoToDetailsButton}
                    onPress={() => handleGoToDetails(item)}
                  >
                    <Text style={globalStyles.ticketsGoToDetailsButtonText}>Go to Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={globalStyles.ticketsAssignButton}
                    onPress={() => handleAssign(item)}
                  >
                    <Text style={globalStyles.ticketsAssignButtonText}>Assign</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketsScreen;
