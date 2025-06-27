import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/firebase';

export default function PaymentScreen() {
  const tailwind = useTailwind();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [message, setMessage] = useState('');
  const [historyVisible, setHistoryVisible] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const handleSubmit = async () => {
    if (!name || !phone || !amount || !selectedMethod) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        name,
        phone,
        amount,
        method: selectedMethod,
        date: new Date().toISOString()
      });
      setMessage(`✅ ${amount} FCFA payment with ${selectedMethod} is processing...`);
      setName('');
      setPhone('');
      setAmount('');
      setSelectedMethod('');
      fetchHistory(); 
    } catch (e) {
      console.error('Error adding document: ', e);
      setMessage('Error processing payment.');
    }
  };

  const fetchHistory = async () => {
    const querySnapshot = await getDocs(collection(db, 'payments'));
    const payments: any[] = [];
    querySnapshot.forEach(doc => payments.push(doc.data()));
    setHistory(payments.reverse());
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={tailwind('p-4 bg-gray-100 min-h-screen')}>
      <View style={tailwind('bg-white rounded-xl p-5 shadow-md')}>
        <TouchableOpacity
          style={tailwind('absolute top-2 right-2 bg-yellow-400 px-3 py-1 rounded')}
          onPress={() => setHistoryVisible(!historyVisible)}
        >
          <Text style={tailwind('text-white text-xs')}>History</Text>
        </TouchableOpacity>

        <Text style={tailwind('text-xl text-center font-bold text-gray-800 mb-4')}>
          Secure Payment
        </Text>

        <Text style={tailwind('text-gray-700 mb-1')}>Customer Name</Text>
        <TextInput
          placeholder="e.g. Clery T."
          value={name}
          onChangeText={setName}
          style={tailwind('border border-gray-300 p-2 rounded mb-2')}
        />

        <Text style={tailwind('text-gray-700 mb-1')}>Phone Number</Text>
        <TextInput
          placeholder="e.g. 695123456"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={tailwind('border border-gray-300 p-2 rounded mb-2')}
        />

        <Text style={tailwind('text-gray-700 mb-1')}>Amount (FCFA)</Text>
        <TextInput
          placeholder="e.g. 5000"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={tailwind('border border-gray-300 p-2 rounded mb-2')}
        />

        <Text style={tailwind('text-gray-700 mb-1')}>Payment Method</Text>
        <View style={tailwind('flex-row justify-between mb-3')}>
          {['Orange', 'MTN', 'Visa'].map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setSelectedMethod(method)}
              style={tailwind(
                `px-4 py-2 rounded ${
                  selectedMethod === method ? 'bg-blue-600' : 'bg-gray-200'
                }`
              )}
            >
              <Text style={tailwind(`${selectedMethod === method ? 'text-white' : 'text-black'} font-bold`)}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={tailwind('bg-green-500 py-3 rounded')}
          onPress={handleSubmit}
        >
          <Text style={tailwind('text-center text-white font-bold')}>Confirm Payment</Text>
        </TouchableOpacity>

        {!!message && (
          <Text style={tailwind('text-center mt-4 text-green-700')}>{message}</Text>
        )}

        {historyVisible && (
          <View style={tailwind('mt-4 bg-gray-100 p-3 rounded')}>
            <Text style={tailwind('font-bold mb-2')}>Payment History:</Text>
            {history.length === 0 ? (
              <Text>No records yet.</Text>
            ) : (
              history.map((item, index) => (
                <Text key={index} style={tailwind('text-sm mb-1')}>
                  {item.name} paid {item.amount} FCFA via {item.method} on{' '}
                  {new Date(item.date).toLocaleString()}
                </Text>
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
