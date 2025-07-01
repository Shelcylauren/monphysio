import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import  tw from 'twrnc';
import { router } from 'expo-router';

type CalendarDate = {
  day: number;
  isDisabled: boolean;
} | null;

type ConsultationType = {
  id: string;
  name: string;
  price: number;
  icon: string;
};

type Specialist = {
  id: number;
  name: string;
};

const { width } = Dimensions.get('window');

const AppointmentBookingApp = () => {
  const [activeTab, setActiveTab] = useState<'appointment' | 'online'>('appointment');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>('video');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [onlineCurrentMonth, setOnlineCurrentMonth] = useState<number>(new Date().getMonth());
  const [onlineCurrentYear, setOnlineCurrentYear] = useState<number>(2025);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const specialists: Specialist[] = [
    { id: 1, name: 'Dr. Marie Dubois - Fracture Specialist' },
    { id: 2, name: 'Dr. Pierre Martin - Massage Therapist' },
    { id: 3, name: 'Dr. Sophie Laurent - Joint Specialist' },
    { id: 4, name: 'Dr. Jean Moreau - Lymphatic Drainage' }
  ];

  const consultationTypes: ConsultationType[] = [
    { id: 'chat', name: 'Quick Chat', price: 4000, icon: '💬' },
    { id: 'voice', name: 'Voice Call', price: 12000, icon: '📞' },
    { id: 'video', name: 'Video Call', price: 15000, icon: '📹' }
  ];

  const timeSlots = {
    morning: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'],
    afternoon: ['14:00', '15:00', '16:00'],
    evening: ['18:00', '19:00']
  };

  const onlineTimeSlots = {
    morning: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
    afternoon: ['14:00', '15:00', '16:00']
  };

  const generateCalendar = (year: number, month: number): CalendarDate[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const calendar: CalendarDate[] = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isDisabled = currentDate < todayMidnight;
      calendar.push({ day, isDisabled });
    }

    return calendar;
  };

  const navigateMonth = (direction: 'prev' | 'next', isOnline: boolean = false) => {
    if (isOnline) {
      if (direction === 'prev') {
        if (onlineCurrentMonth === 0) {
          setOnlineCurrentMonth(11);
          setOnlineCurrentYear(prev => prev - 1);
        } else {
          setOnlineCurrentMonth(prev => prev - 1);
        }
      } else {
        if (onlineCurrentMonth === 11) {
          setOnlineCurrentMonth(0);
          setOnlineCurrentYear(prev => prev + 1);
        } else {
          setOnlineCurrentMonth(prev => prev + 1);
        }
      }
    } else {
      if (direction === 'prev') {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(prev => prev - 1);
        } else {
          setCurrentMonth(prev => prev - 1);
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(prev => prev + 1);
        } else {
          setCurrentMonth(prev => prev + 1);
        }
      }
    }
  };

  const handleReset = () => {
    setSelectedSpecialist('');
    setSelectedConsultationType('video');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleSubmit = () => {
    if (activeTab === 'online') {
      if (selectedDate && selectedTime) {
        const selectedType = consultationTypes.find(type => type.id === selectedConsultationType);
        if (selectedType) {
          Alert.alert('Success', `${selectedType.name} booked for ${selectedDate} at ${selectedTime} - ${selectedType.price} FCFA`);
        }
      } else {
        Alert.alert('Error', 'Please select all required fields');
      }
    } else {
      if (selectedSpecialist && selectedDate && selectedTime) {
        Alert.alert('Success', `Appointment booked with ${selectedSpecialist} on ${selectedDate} at ${selectedTime}`);
      } else {
        Alert.alert('Error', 'Please select all required fields');
      }
    }
  };

  const calendar = activeTab === 'appointment' 
    ? generateCalendar(currentYear, currentMonth)
    : generateCalendar(onlineCurrentYear, onlineCurrentMonth);

  const currentSlots = activeTab === 'appointment' ? timeSlots : onlineTimeSlots;

  const renderCalendarGrid = () => {
    const rows = [];
    for (let i = 0; i < calendar.length; i += 7) {
      const week = calendar.slice(i, i + 7);
      rows.push(
        <View key={i} style={styles.calendarRow}>
          {week.map((date, index) => (
            <TouchableOpacity
              key={i + index}
              onPress={() => {
                if (date && !date.isDisabled) {
                  const month = activeTab === 'appointment' ? currentMonth : onlineCurrentMonth;
                  const year = activeTab === 'appointment' ? currentYear : onlineCurrentYear;
                  setSelectedDate(`${date.day}/${month + 1}/${year}`);
                }
              }}
              style={[
                styles.calendarDay,
                !date && styles.calendarDayEmpty,
                date && date.isDisabled && styles.calendarDayDisabled,
                date && selectedDate === `${date.day}/${activeTab === 'appointment' ? currentMonth + 1 : onlineCurrentMonth + 1}/${activeTab === 'appointment' ? currentYear : onlineCurrentYear}` && styles.calendarDaySelected
              ]}
              disabled={!date || date.isDisabled}
            >
              <Text style={[
                styles.calendarDayText,
                date && date.isDisabled && styles.calendarDayTextDisabled,
                date && selectedDate === `${date.day}/${activeTab === 'appointment' ? currentMonth + 1 : onlineCurrentMonth + 1}/${activeTab === 'appointment' ? currentYear : onlineCurrentYear}` && styles.calendarDayTextSelected
              ]}>
                {date?.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Book an appointment</Text>
          
          {/* Tab Toggle */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('appointment')}
              style={[
                styles.tab,
                activeTab === 'appointment' && styles.tabActive
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'appointment' && styles.tabTextActive
              ]}>
                Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('online')}
              style={[
                styles.tab,
                activeTab === 'online' && styles.tabActive
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'online' && styles.tabTextActive
              ]}>
                Online
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'appointment' ? (
            // Appointment View
            <View style={styles.section}>
              {/* Specialist Selection */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderIcon}>👨‍⚕️</Text>
                  <Text style={styles.sectionTitle}>Choose specialist</Text>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedSpecialist}
                    onValueChange={(itemValue) => setSelectedSpecialist(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Choose specialist" value="" />
                    {specialists.map(specialist => (
                      <Picker.Item 
                        key={specialist.id} 
                        label={specialist.name} 
                        value={specialist.name} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Date Selection */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderIcon}>📅</Text>
                  <Text style={styles.sectionTitle}>Choose a date</Text>
                </View>
                
                <View style={styles.calendarHeader}>
                  <TouchableOpacity
                    onPress={() => navigateMonth('prev')}
                    style={styles.navigationButton}
                  >
                    <Text style={styles.navigationButtonText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.monthTitle}>
                    {months[currentMonth]} {currentYear}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigateMonth('next')}
                    style={styles.navigationButton}
                  >
                    <Text style={styles.navigationButtonText}>›</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarRow}>
                    {dayHeaders.map(day => (
                      <View key={day} style={styles.dayHeader}>
                        <Text style={styles.dayHeaderText}>{day}</Text>
                      </View>
                    ))}
                  </View>
                  {renderCalendarGrid()}
                </View>
              </View>

              {/* Time Selection */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderIcon}>🕐</Text>
                  <Text style={styles.sectionTitle}>Choose time</Text>
                </View>
                
                {Object.entries(currentSlots).map(([period, slots]) => (
                  <View key={period} style={styles.timeSlotSection}>
                    <View style={styles.timeSlotHeader}>
                      <Text style={styles.timeSlotPeriod}>
                        {period === 'morning' ? '🌅 Morning' : period === 'afternoon' ? '🌤️ Afternoon' : '🌙 Evening'}
                      </Text>
                      <Text style={styles.timeSlotCount}>{slots.length} slots</Text>
                    </View>
                    <View style={styles.timeSlotGrid}>
                      {slots.map(time => (
                        <TouchableOpacity
                          key={time}
                          onPress={() => setSelectedTime(time)}
                          style={[
                            styles.timeSlot,
                            selectedTime === time && styles.timeSlotSelected
                          ]}
                        >
                          <Text style={[
                            styles.timeSlotText,
                            selectedTime === time && styles.timeSlotTextSelected
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            // Online View
            <View style={styles.section}>
              {/* Consultation Type */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Select Consultation Type</Text>
                <View style={styles.consultationGrid}>
                  {consultationTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => setSelectedConsultationType(type.id)}
                      style={[
                        styles.consultationType,
                        selectedConsultationType === type.id && styles.consultationTypeSelected
                      ]}
                    >
                      <View style={[
                        styles.consultationIcon,
                        selectedConsultationType === type.id && styles.consultationIconSelected
                      ]}>
                        <Text style={styles.consultationIconText}>{type.icon}</Text>
                      </View>
                      <Text style={styles.consultationName}>{type.name}</Text>
                      <Text style={styles.consultationPrice}>{type.price} FCFA</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date Selection */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderIcon}>📅</Text>
                  <Text style={styles.sectionTitle}>Choose a date</Text>
                </View>
                
                <View style={styles.calendarHeader}>
                  <TouchableOpacity
                    onPress={() => navigateMonth('prev', true)}
                    style={styles.navigationButton}
                  >
                    <Text style={styles.navigationButtonText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.monthTitle}>
                    {months[onlineCurrentMonth]} {onlineCurrentYear}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigateMonth('next', true)}
                    style={styles.navigationButton}
                  >
                    <Text style={styles.navigationButtonText}>›</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarRow}>
                    {dayHeaders.map(day => (
                      <View key={day} style={styles.dayHeader}>
                        <Text style={styles.dayHeaderText}>{day}</Text>
                      </View>
                    ))}
                  </View>
                  {renderCalendarGrid()}
                </View>
              </View>

              {/* Time Selection */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderIcon}>🕐</Text>
                  <Text style={styles.sectionTitle}>Choose time</Text>
                </View>
                
                {Object.entries(currentSlots).map(([period, slots]) => (
                  <View key={period} style={styles.timeSlotSection}>
                    <View style={styles.timeSlotHeader}>
                      <Text style={styles.timeSlotPeriod}>
                        {period === 'morning' ? '🌅 Morning' : '🌤️ Afternoon'}
                      </Text>
                      <Text style={styles.timeSlotCount}>{slots.length} slots</Text>
                    </View>
                    <View style={styles.timeSlotGrid}>
                      {slots.map(time => (
                        <TouchableOpacity
                          key={time}
                          onPress={() => setSelectedTime(time)}
                          style={[
                            styles.timeSlot,
                            selectedTime === time && styles.timeSlotSelected
                          ]}
                        >
                          <Text style={[
                            styles.timeSlotText,
                            selectedTime === time && styles.timeSlotTextSelected
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {activeTab === 'appointment' ? 'Find specialist' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Close Button */}
      <TouchableOpacity
        style={tw`w-full px-6 py-3 mt-2 bg-white rounded-full`}
        onPress={() => router.replace('/(auth)/what_next')}
        activeOpacity={0.8}
      >
        <Text style={tw`text-base italic font-medium text-center text-blue-600`}>
          close
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppointmentBookingApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea', // gradient approximation
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    maxHeight: '90%',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabText: {
    fontWeight: '600',
    color: '#6b7280',
  },
  tabTextActive: {
    color: 'white',
  },
  content: {
    paddingHorizontal: 24,
    maxHeight: 400,
  },
  section: {
    paddingBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    color: '#374151',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButton: {
    padding: 8,
    borderRadius: 8,
  },
  navigationButtonText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  calendarContainer: {
    marginBottom: 16,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayHeader: {
    width: (width - 80) / 7,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  calendarDay: {
    width: (width - 80) / 7,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  calendarDayEmpty: {
    backgroundColor: 'transparent',
  },
  calendarDayDisabled: {
    backgroundColor: 'transparent',
  },
  calendarDaySelected: {
    backgroundColor: '#3b82f6',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  calendarDayTextDisabled: {
    color: '#d1d5db',
  },
  calendarDayTextSelected: {
    color: 'white',
  },
  timeSlotSection: {
    marginBottom: 16,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeSlotPeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginRight: 8,
  },
  timeSlotCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    minWidth: (width - 80) / 3 - 8,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  timeSlotTextSelected: {
    color: 'white',
  },
  consultationGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  consultationType: {
    flex: 1,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  consultationTypeSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  consultationIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  consultationIconSelected: {
    backgroundColor: '#3b82f6',
  },
  consultationIconText: {
    fontSize: 16,
  },
  consultationName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  consultationPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontWeight: '600',
    color: '#6b7280',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontWeight: '600',
    color: 'white',
  },
});

