import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView, ScrollView as RNScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Message {
  id: number;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
  isDiagnostic?: boolean;
}

const ConsultationScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello, I am Dr. Imele. How can I assist you today? Please describe your symptoms in detail.',
      time: '10:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<RNScrollView>(null);

  const patientData = {
    name: "Shelcy",
    age: 25,
    gender: "female",
    history: ["Hypertension (since 2022)", "Allergy to penicillin"]
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add patient message
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'patient',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate doctor's reply after delay
    setTimeout(() => {
      setIsTyping(false);
      simulateDoctorReply();
    }, 1500);
  };

  const simulateDoctorReply = () => {
    const nextStep = step + 1;
    setStep(nextStep);

    let doctorMessage: Message;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    switch (nextStep) {
      case 1:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Thank you for this information. How long have you been experiencing these symptoms?',
          time: currentTime
        };
        break;
      case 2:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'I understand. Is the pain constant or intermittent? Can you describe it (dull, sharp, throbbing...) ?',
          time: currentTime
        };
        break;
      case 3:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Have you noticed any factors that aggravate or relieve the pain?',
          time: currentTime
        };
        break;
      case 4:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Thank you for this information. I will now analyze your responses to establish a diagnosis.',
          time: currentTime
        };
        setTimeout(showFinalDiagnostic, 2500);
        break;
      default:
        return;
    }

    setMessages(prev => [...prev, doctorMessage]);
  };

  const showFinalDiagnostic = () => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const diagnosticMessage: Message = {
        id: messages.length + 3,
        sender: 'doctor',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDiagnostic: true
      };

      setMessages(prev => [...prev, diagnosticMessage]);
      setShowActions(true);
    }, 2000);
  };

  const downloadDiagnostic = () => {
    Alert.alert(
      'Diagnostic downloaded',
      `The diagnostic for ${patientData.name} has been saved.`,
      [{ text: 'OK' }]
    );
  };

  const showHistory = () => {
    Alert.alert(
      'Medical History',
      `Patient: ${patientData.name}\nAge: ${patientData.age} years\n\nHistory:\n- ${patientData.history.join('\n- ')}\n\nAllergies:\n- PPenicillin`,
      [{ text: 'Close' }]
    );
  };

  const newConsultation = () => {
    Alert.alert(
      'New Consultation',
      'Do you really want to start a new consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm', onPress: () => {
            setMessages([{
              id: 1,
              sender: 'doctor',
              text: 'Hello, I am Dr. Martin. How can I help you today? Please describe your symptoms in detail.',
              time: '10:00'
            }]);
            setStep(0);
            setShowActions(false);
          }
        }
      ]
    );
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-2 py-4 bg-blue-600 shadow-md pt-14 rounded-b-xl">
        <Text className="text-xl font-bold text-center text-white">
          <FontAwesome name="comments" size={20} color="white" /> Medical Consultaion
        </Text>
      </View>

      {/* Chat Container */}
      <View className="flex-1 px-2 pt-2">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 mb-2"
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`flex mb-3 ${message.sender === 'doctor' ? 'items-start' : 'items-end'}`}
            >
              {message.isDiagnostic ? (
                <View className="w-5/6 p-4 border-l-4 border-yellow-400 rounded-lg bg-yellow-50">
                  <Text className="mb-2 text-lg font-bold text-blue-600">
                    <MaterialCommunityIcons name="stethoscope" size={18} /> DIAGNOSTIC
                  </Text>
                  <Text className="mb-1 text-gray-800">
                    <Text className="font-bold">Patient :</Text> {patientData.name}, {patientData.age} ans
                  </Text>
                  <Text className="mb-1 text-gray-800">
                    <Text className="font-bold">Diagnostic :</Text> Acute mechanical low
                  </Text>
                  <Text className="mb-3 text-gray-800">
                    <Text className="font-bold">Treatment :</Text> Paracetamol 1g 3x/day, stretching
                  </Text>
                  <Text className="text-sm text-gray-500">
                    <MaterialIcons name="access-time" size={14} /> {message.time}
                  </Text>
                </View>
              ) : (
                <View
                  className={`p-3 rounded-2xl max-w-[80%] ${message.sender === 'doctor'
                    ? 'bg-blue-50 rounded-tl-none'
                    : 'bg-green-50 rounded-tr-none'}`}
                >
                  <Text className={`font-semibold ${message.sender === 'doctor' ? 'text-blue-600' : 'text-green-600'}`}>
                    {message.sender === 'doctor' ? 'Dr. Martin' : patientData.name}
                  </Text>
                  <Text className="my-1 text-gray-800">{message.text}</Text>
                  <Text className="text-xs text-right text-gray-500">{message.time}</Text>
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View className="flex items-start mb-3">
              <View className="p-3 rounded-tl-none bg-blue-50 rounded-2xl">
                <View className="flex flex-row space-x-1">
                  <View className="w-2 h-2 bg-gray-500 rounded-full opacity-60" style={{ transform: [{ translateY: -3 }] }} />
                  <View className="w-2 h-2 bg-gray-500 rounded-full opacity-60" style={{ transform: [{ translateY: 0 }] }} />
                  <View className="w-2 h-2 bg-gray-500 rounded-full opacity-60" style={{ transform: [{ translateY: -3 }] }} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="flex-row items-center p-2 mb-2 bg-white rounded-full shadow-md">
          <TextInput
            className="flex-1 px-4 py-2 text-gray-800"
            placeholder="Describe your symptoms ..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            className="p-3 bg-green-500 rounded-full"
            disabled={inputText.trim() === ''}
          >
            <FontAwesome name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons (shown after diagnosis) */}
      {showActions && (
        <View className="p-4 bg-white border-t border-gray-200">
          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity
              onPress={downloadDiagnostic}
              className="flex-row items-center justify-center flex-1 px-4 py-3 bg-blue-600 rounded-lg"
            >
              <FontAwesome name="download" size={16} color="white" />
              <Text className="ml-2 text-white">Diagnostic</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showHistory}
              className="flex-row items-center justify-center flex-1 px-4 py-3 rounded-lg bg-cyan-500"
            >
              <FontAwesome name="history" size={16} color="white" />
              <Text className="ml-2 text-white">History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={newConsultation}
              className="flex-row items-center justify-center flex-1 px-4 py-3 bg-yellow-400 rounded-lg"
            >
              <FontAwesome name="plus" size={16} color="black" />
              <Text className="ml-2 text-black">New</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConsultationScreen;

