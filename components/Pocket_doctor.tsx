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
      text: 'Bonjour, je suis le Dr. Imele. Comment puis-je vous aider aujourd\'hui ? Décrivez-moi vos symptômes en détail.',
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
    gender: "feminin",
    history: ["Hypertension (depuis 2022)", "Allergie à la pénicilline"]
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
          text: 'Merci pour ces informations. Depuis combien de temps ressentez-vous ces symptômes ?',
          time: currentTime
        };
        break;
      case 2:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Je comprends. La douleur est-elle constante ou intermittente ? Pouvez-vous la décrire (douleur sourde, aiguë, pulsatile...) ?',
          time: currentTime
        };
        break;
      case 3:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Avez-vous remarqué des facteurs qui aggravent ou soulagent la douleur ?',
          time: currentTime
        };
        break;
      case 4:
        doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          text: 'Merci pour ces précisions. Je vais maintenant analyser vos réponses pour établir un diagnostic.',
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
      'Diagnostic téléchargé',
      `Le diagnostic pour ${patientData.name} a été enregistré.`,
      [{ text: 'OK' }]
    );
  };

  const showHistory = () => {
    Alert.alert(
      'Historique Médical',
      `Patient: ${patientData.name}\nÂge: ${patientData.age} ans\n\nAntécédents:\n- ${patientData.history.join('\n- ')}\n\nAllergies:\n- Pénicilline`,
      [{ text: 'Fermer' }]
    );
  };

  const newConsultation = () => {
    Alert.alert(
      'Nouvelle consultation',
      'Voulez-vous vraiment commencer une nouvelle consultation ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => {
          setMessages([{
            id: 1,
            sender: 'doctor',
            text: 'Bonjour, je suis le Dr. Martin. Comment puis-je vous aider aujourd\'hui ? Décrivez-moi vos symptômes en détail.',
            time: '10:00'
          }]);
          setStep(0);
          setShowActions(false);
        }}
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
      <View className="bg-blue-600 py-4 px-2 rounded-b-xl shadow-md">
        <Text className="text-white text-xl font-bold text-center">
          <FontAwesome name="comments" size={20} color="white" /> Consultation Médicale
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
                <View className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 w-5/6">
                  <Text className="text-blue-600 font-bold text-lg mb-2">
                    <MaterialCommunityIcons name="stethoscope" size={18} /> DIAGNOSTIC
                  </Text>
                  <Text className="text-gray-800 mb-1">
                    <Text className="font-bold">Patient :</Text> {patientData.name}, {patientData.age} ans
                  </Text>
                  <Text className="text-gray-800 mb-1">
                    <Text className="font-bold">Diagnostic :</Text> Lombalgie mécanique aiguë
                  </Text>
                  <Text className="text-gray-800 mb-3">
                    <Text className="font-bold">Traitement :</Text> Paracétamol 1g 3x/jour, étirements
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
                  <Text className="text-gray-800 my-1">{message.text}</Text>
                  <Text className="text-xs text-gray-500 text-right">{message.time}</Text>
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View className="flex items-start mb-3">
              <View className="bg-blue-50 p-3 rounded-2xl rounded-tl-none">
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
        <View className="flex-row items-center bg-white p-2 rounded-full shadow-md mb-2">
          <TextInput
            className="flex-1 py-2 px-4 text-gray-800"
            placeholder="Décrivez vos symptômes..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity 
            onPress={handleSendMessage}
            className="bg-green-500 p-3 rounded-full"
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
              className="bg-blue-600 py-3 px-4 rounded-lg flex-1 items-center flex-row justify-center"
            >
              <FontAwesome name="download" size={16} color="white" />
              <Text className="text-white ml-2">Diagnostic</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={showHistory}
              className="bg-cyan-500 py-3 px-4 rounded-lg flex-1 items-center flex-row justify-center"
            >
              <FontAwesome name="history" size={16} color="white" />
              <Text className="text-white ml-2">Historique</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={newConsultation}
              className="bg-yellow-400 py-3 px-4 rounded-lg flex-1 items-center flex-row justify-center"
            >
              <FontAwesome name="plus" size={16} color="black" />
              <Text className="text-black ml-2">Nouvelle</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

