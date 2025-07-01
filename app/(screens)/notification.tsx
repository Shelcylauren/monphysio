import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn';
import moment from 'moment';

interface Appointment {
  id: string;
  type: 'consultation' | 'treatment';
  doctor: string;
  datetime: string; // ISO format
  notifiedMissed?: boolean;
}

export default function NotificationScreen() {
  const tailwind = useTailwind();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [doctor, setDoctor] = useState('');
  const [type, setType] = useState<'consultation' | 'treatment'>('consultation');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      updateNotifications();
    }, 1000 * 60); // every minute

    return () => clearInterval(interval);
  }, [appointments]);

  const addAppointment = () => {
    if (!doctor || !datetime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctor,
      type,
      datetime,
    };
    setAppointments([...appointments, newAppointment]);
    setDoctor('');
    setDatetime('');
  };

  const updateNotifications = () => {
    const now = moment();
    const newNotifs: string[] = [];

    const updatedAppointments = appointments.map(app => {
      const apptTime = moment(app.datetime);
      const daysDiff = apptTime.diff(now, 'days');
      const isToday = apptTime.isSame(now, 'day');
      const isPast = apptTime.isBefore(now);

      if (daysDiff === 2) {
        newNotifs.push(`⏳ Remember : You have a ${app.type === 'consultation' ? 'Appointment' : 'Treatment'} in two days at ${apptTime.format('HH:mm')} with Dr. ${app.doctor}`);
      }

      if (isToday && !isPast) {
        newNotifs.push(`📅 Today : ${app.type === 'consultation' ? 'Appointment' : 'Treatment'} at ${apptTime.format('HH:mm')} with Dr. ${app.doctor}`);
      }

      if (isPast && !app.notifiedMissed) {
        newNotifs.push(`⚠️ Missed : You had a ${app.type} with Dr. ${app.doctor} at ${apptTime.format('HH:mm')}.`);
        return { ...app, notifiedMissed: true };
      }

      return app;
    });

    setAppointments(updatedAppointments);
    setNotifications(newNotifs);
  };

  return (
    <SafeAreaView style={tailwind('flex-1 bg-gray-900 p-4')}>
      <Text style={tailwind('text-white text-2xl font-bold mb-4')}>
        Medical Notifications
      </Text>

      <View style={tailwind('mb-4')}>
        <TextInput
          placeholder="Doctor Name"
          value={doctor}
          onChangeText={setDoctor}
          placeholderTextColor="#ccc"
          style={tailwind('bg-gray-800 text-white px-4 py-2 rounded mb-2')}
        />
        <TextInput
          placeholder="YYYY-MM-DDTHH:mm"
          value={datetime}
          onChangeText={setDatetime}
          placeholderTextColor="#ccc"
          style={tailwind('bg-gray-800 text-white px-4 py-2 rounded mb-2')}
        />
        <View style={tailwind('flex-row justify-between mb-2')}>
          <Button title="Consultation" onPress={() => setType('consultation')} />
          <Button title="Traitement" onPress={() => setType('treatment')} />
        </View>
        <Button title="Ajouter le rendez-vous" onPress={addAppointment} />
      </View>

      <ScrollView style={tailwind('mt-4')}>
        {notifications.map((note, idx) => (
          <View key={idx} style={tailwind('bg-gray-800 p-3 rounded mb-2')}>
            <Text style={tailwind('text-white')}>{note}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
