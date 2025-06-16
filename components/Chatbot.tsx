import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Interfaces TypeScript
interface Symptom {
  id: string;
  name: string;
  severity?: number;
}

interface DiagnosticResults {
  diagnostic: string;
  advice: string;
  treatment: string;
  patientName: string;
  question: string;
}

interface PatientData {
  patientName: string;
  medicalHistory: string;
  question: string;
}

const PhysioAssistant: React.FC = () => {
  // États typés
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [patientName, setPatientName] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [floatAnim] = useState<Animated.Value>(new Animated.Value(0));

  const symptoms: string[] = [
    'Sciatic pain',
    'Lower back pain',
    'Muscle stiffness',
    'Tingling',
    'Muscle weakness',
    'Neck pain',
    'Joint pain',
    'Shoulder pain',
    'Knee pain',
    'Hip pain',
    'Ankle sprain',
    'Wrist pain',
    'Headaches',
    'Posture problems',
    'Sports injury',
    'Arthritis pain',
    'Fibromyalgia',
    'Chronic fatigue',
    'Balance issues',
    'Mobility problems',
    'Post-surgery rehabilitation',
    'Muscle spasms',
    'Tennis elbow',
    'Frozen shoulder',
    'Plantar fasciitis',
  ];

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const toggleSymptom = (symptom: string): void => {
    setSelectedSymptoms((prev: string[]) => 
      prev.includes(symptom)
        ? prev.filter((s: string) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const generateAIResponse = (symptoms: string[], history: string): DiagnosticResults => {
    const responses = {
      diagnostic: '',
      advice: '',
      treatment: '',
      patientName: patientName,
      question: question.trim() || 'No question asked.'
    };

    // Analyse des symptômes multiples
    const hasBackPain = symptoms.some(s => s.includes('back pain') || s.includes('Sciatic pain'));
    const hasNeckPain = symptoms.includes('Neck pain');
    const hasJointPain = symptoms.some(s => s.includes('Joint pain') || s.includes('Knee pain') || s.includes('Hip pain'));
    const hasShoulderPain = symptoms.some(s => s.includes('Shoulder pain') || s.includes('Frozen shoulder') || s.includes('Tennis elbow'));
    const hasSportsInjury = symptoms.includes('Sports injury');
    const hasArthritis = symptoms.includes('Arthritis pain');
    const hasFibromyalgia = symptoms.includes('Fibromyalgia');
    const hasPostureProblems = symptoms.includes('Posture problems');
    const hasBalanceIssues = symptoms.includes('Balance issues');
    const hasAnkleIssues = symptoms.some(s => s.includes('Ankle sprain') || s.includes('Plantar fasciitis'));

    // Diagnostic basé sur les combinaisons de symptômes
    if (hasBackPain && symptoms.includes('Muscle weakness') && symptoms.includes('Tingling')) {
      responses.diagnostic = 'you appear to have a herniated disc with nerve compression. This condition affects the spine and can cause radiating pain.';
      responses.advice = 'Herniated discs often result from poor lifting technique, prolonged sitting, or age-related wear. Avoid heavy lifting and prolonged sitting.';
      responses.treatment = 'Spinal decompression exercises, core strengthening, McKenzie method exercises, and ergonomic education. Consider epidural injections if severe.';
    } else if (hasBackPain && symptoms.includes('Muscle stiffness')) {
      responses.diagnostic = 'you seem to have mechanical lower back pain with muscle tension.';
      responses.advice = 'Often caused by poor posture, sedentary lifestyle, or muscle imbalances. Regular movement and proper ergonomics are crucial.';
      responses.treatment = 'Manual therapy, progressive loading exercises, postural correction, and heat/cold therapy. Focus on hip flexor stretching and glute strengthening.';
    } else if (hasSportsInjury && hasJointPain) {
      responses.diagnostic = 'you have a sports-related joint injury that requires specific rehabilitation.';
      responses.advice = 'Sports injuries need proper rest initially, followed by gradual return to activity. Avoid the aggravating activity until cleared.';
      responses.treatment = 'RICE protocol initially, then progressive strengthening, proprioceptive training, and sport-specific exercises. Consider taping or bracing.';
    } else if (hasNeckPain && symptoms.includes('Headaches')) {
      responses.diagnostic = 'you show signs of cervicogenic headaches originating from your neck.';
      responses.advice = 'Often related to forward head posture, stress, or prolonged computer use. Ergonomic workspace setup is essential.';
      responses.treatment = 'Cervical mobilization, deep neck flexor strengthening, postural exercises, and stress management techniques.';
    } else if (hasShoulderPain && symptoms.includes('Muscle weakness')) {
      responses.diagnostic = 'you likely have rotator cuff dysfunction or impingement syndrome.';
      responses.advice = 'Shoulder problems often develop from overhead activities or poor posture. Avoid overhead movements until symptoms improve.';
      responses.treatment = 'Rotator cuff strengthening, scapular stabilization exercises, joint mobilization, and activity modification.';
    } else if (symptoms.includes('Frozen shoulder')) {
      responses.diagnostic = 'you have adhesive capsulitis (frozen shoulder), a condition that limits shoulder movement.';
      responses.advice = 'This condition typically goes through three phases: freezing, frozen, and thawing. Patience is key as it can take 1-3 years to fully resolve.';
      responses.treatment = 'Gentle range of motion exercises, joint mobilization, heat therapy, and gradual stretching. Avoid aggressive stretching.';
    } else if (hasArthritis && hasJointPain) {
      responses.diagnostic = 'you appear to have arthritis-related joint pain requiring ongoing management.';
      responses.advice = 'Arthritis is a chronic condition that benefits from regular, gentle exercise. Maintain a healthy weight to reduce joint stress.';
      responses.treatment = 'Low-impact exercises, aquatic therapy, joint protection techniques, heat/cold therapy, and pain management strategies.';
    } else if (hasFibromyalgia && symptoms.includes('Chronic fatigue')) {
      responses.diagnostic = 'you show signs of fibromyalgia, a chronic pain condition affecting multiple body systems.';
      responses.advice = 'Fibromyalgia requires a multidisciplinary approach including sleep hygiene, stress management, and paced activity.';
      responses.treatment = 'Gentle aerobic exercise, flexibility training, relaxation techniques, sleep optimization, and energy conservation strategies.';
    } else if (hasAnkleIssues) {
      responses.diagnostic = 'you have a foot/ankle condition that affects your mobility and balance.';
      responses.advice = 'Foot problems often relate to improper footwear, biomechanical issues, or overuse. Proper footwear is crucial.';
      responses.treatment = 'Ankle strengthening, proprioceptive training, manual therapy, orthotics if needed, and gait retraining.';
    } else if (hasBalanceIssues && symptoms.includes('Mobility problems')) {
      responses.diagnostic = 'you have balance and mobility issues that increase fall risk.';
      responses.advice = 'Balance problems can have multiple causes including inner ear issues, muscle weakness, or neurological conditions.';
      responses.treatment = 'Balance training, fall prevention exercises, strength training, environmental modifications, and assistive device training if needed.';
    } else if (hasPostureProblems && hasNeckPain) {
      responses.diagnostic = 'you have postural dysfunction contributing to your neck and potentially back pain.';
      responses.advice = 'Modern lifestyle often leads to forward head posture and rounded shoulders. Ergonomic improvements are essential.';
      responses.treatment = 'Postural re-education, strengthening of deep neck flexors and rhomboids, stretching of chest and upper traps, ergonomic assessment.';
    } else if (symptoms.includes('Tennis elbow')) {
      responses.diagnostic = 'you have lateral epicondylitis (tennis elbow), an overuse injury of the forearm muscles.';
      responses.advice = 'This condition often results from repetitive gripping activities or poor technique in racquet sports.';
      responses.treatment = 'Eccentric strengthening exercises, activity modification, ergonomic improvements, and possibly bracing during activities.';
    } else if (symptoms.includes('Plantar fasciitis')) {
      responses.diagnostic = 'you have plantar fasciitis, inflammation of the tissue connecting heel to toes.';
      responses.advice = 'Often caused by sudden increase in activity, poor footwear, or tight calf muscles. Morning pain is typical.';
      responses.treatment = 'Calf stretching, plantar fascia stretching, foot strengthening, proper footwear, and possibly night splints.';
    } else if (symptoms.includes('Post-surgery rehabilitation')) {
      responses.diagnostic = 'you require post-surgical rehabilitation to restore function and prevent complications.';
      responses.advice = 'Follow your surgeon\'s restrictions carefully. Rehabilitation should be progressive and supervised.';
      responses.treatment = 'Phase-specific rehabilitation including range of motion, strengthening, functional training, and scar tissue management.';
    } else if (symptoms.includes('Muscle spasms') && symptoms.includes('Muscle stiffness')) {
      responses.diagnostic = 'you have muscle spasms and tension that may indicate underlying muscle imbalances.';
      responses.advice = 'Muscle spasms often protect injured tissue but can become problematic if persistent. Identify and address triggers.';
      responses.treatment = 'Muscle relaxation techniques, gentle stretching, heat therapy, trigger point release, and progressive strengthening.';
    } else if (hasNeckPain) {
      responses.diagnostic = 'you show signs of neck pain, possibly related to posture or muscle tension.';
      responses.advice = 'Neck pain is often related to stress, poor ergonomics, or sleeping position. Consider your daily habits.';
      responses.treatment = 'Neck stretches, strengthening exercises, postural correction, ergonomic improvements, and stress management.';
    } else if (symptoms.includes('Muscle stiffness')) {
      responses.diagnostic = 'you suffer from muscle tension and stiffness affecting your mobility.';
      responses.advice = 'Muscle stiffness can result from inactivity, overuse, dehydration, or stress. Regular movement is key.';
      responses.treatment = 'Dynamic stretching, therapeutic massage, heat therapy, gradual exercise progression, and hydration optimization.';
    } else if (hasJointPain) {
      responses.diagnostic = 'you have joint pain that may indicate inflammation or mechanical dysfunction.';
      responses.advice = 'Joint pain can have various causes including wear and tear, inflammation, or injury. Activity modification may be needed.';
      responses.treatment = 'Joint mobility exercises, strengthening of supporting muscles, anti-inflammatory measures, and activity modification.';
    } else {
      responses.diagnostic = 'your symptoms require comprehensive evaluation to determine the best treatment approach.';
      responses.advice = 'Multiple factors may be contributing to your condition. A thorough assessment is needed.';
      responses.treatment = 'Detailed consultation recommended for personalized treatment plan including movement assessment and targeted interventions.';
    }

    return responses;
  };

  const analyzeSymptoms = (): void => {
    if (!patientName.trim() || selectedSymptoms.length === 0) {
      Alert.alert('Error', 'Please fill in your name and select at least one symptom.');
      return;
    }

    const aiResponse: DiagnosticResults = generateAIResponse(selectedSymptoms, medicalHistory);
    setResults(aiResponse);
    setShowResults(true);
  };

  const resetForm = (): void => {
    setPatientName('');
    setMedicalHistory('');
    setQuestion('');
    setSelectedSymptoms([]);
    setShowResults(false);
    setResults(null);
  };

  const startVideoConsultation = (): void => {
    Alert.alert('Video Consultation', 'Redirecting to video consultation... 📹\n\nFeature in development.');
  };

  const startAudioCall = (): void => {
    Alert.alert('Audio Call', 'Starting audio call... 📞\n\nFeature in development.');
  };

  const floatingTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  // Fonction pour valider les données patient
  const validatePatientData = (data: PatientData): boolean => {
    return data.patientName.trim().length > 0;
  };

  // Fonction pour traiter les symptômes avec vérification de type
  const processSymptoms = (symptoms: string[]): string[] => {
    return symptoms.filter((symptom: string) => 
      typeof symptom === 'string' && symptom.trim().length > 0
    );
  };

  // Rendu des résultats avec vérification null
  const renderResults = (): JSX.Element | null => {
    if (!results) {
      return (
        <View style={styles.resultItem}>
          <Text style={styles.resultText}>Aucun résultat disponible</Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsSection}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Diagnosis:</Text>
          <Text style={styles.resultText}>
            Hello {results.patientName}, {results.diagnostic}
          </Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Advice:</Text>
          <Text style={styles.resultText}>{results.advice}</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Treatment:</Text>
          <Text style={styles.resultText}>{results.treatment}</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Question:</Text>
          <Text style={styles.resultText}>
            {question.trim() 
              ? 'Thank you for your question. For a precise answer, a specialist remains your best contact.'
              : 'No question asked.'
            }
          </Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Consult a specialist:</Text>
          <View style={styles.consultationButtons}>
            <TouchableOpacity
              style={styles.consultationButton}
              onPress={startVideoConsultation}
              activeOpacity={0.8}
            >
              <View style={[styles.buttonGradient, styles.videoBtnGradient]}>
                <Text style={styles.buttonText}>📹 Video Consultation</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.consultationButton}
              onPress={startAudioCall}
              activeOpacity={0.8}
            >
              <View style={[styles.buttonGradient, styles.audioBtnGradient]}>
                <Text style={styles.buttonText}>📞 Audio Call</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.newConsultationButton}
          onPress={resetForm}
          activeOpacity={0.8}
        >
          <View style={[styles.buttonGradient, styles.newConsultBtnGradient]}>
            <Text style={styles.buttonText}>NEW CONSULTATION</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (!showChatbot) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.gradientBackground}>
          <ScrollView contentContainerStyle={styles.landingContainer}>
            <View style={styles.heroContent}>
              <Animated.View 
                style={[
                  styles.robotIcon,
                  { transform: [{ translateY: floatingTranslateY }] }
                ]}
              >
                <Text style={styles.robotEmoji}>🤖</Text>
              </Animated.View>
              
              <Text style={styles.heroTitle}>
                The Future of Health with AI Technology is Here
              </Text>
              
              <Text style={styles.heroDescription}>
                Artificial Intelligence is revolutionizing healthcare by enhancing patient care and making medical processes more efficient. AI analyzes vast datasets to predict diseases, personalize treatments, and assist in surgeries for better outcomes.
              </Text>
              
              <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => setShowChatbot(true)}
                activeOpacity={0.8}
              >
                <View style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>GET STARTED</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.gradientBackground}>
        <View style={styles.chatbotContainer}>
          {/* Header */}
          <View style={styles.chatbotHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowChatbot(false);
                resetForm();
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Physio Assistant</Text>
            <Text style={styles.headerSubtitle}>Your virtual assistant for physiotherapy</Text>
          </View>

          <ScrollView style={styles.contentContainer}>
            {!showResults ? (
              // Form Section
              <View style={styles.formSection}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    value={patientName}
                    onChangeText={(text: string) => setPatientName(text)}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Symptoms:</Text>
                  <View style={styles.symptomsList}>
                    {symptoms.map((symptom: string, index: number) => (
                      <TouchableOpacity
                        key={`symptom-${index}`}
                        style={[
                          styles.symptomItem,
                          selectedSymptoms.includes(symptom) && styles.symptomItemSelected
                        ]}
                        onPress={() => toggleSymptom(symptom)}
                      >
                        <Text style={[
                          styles.symptomText,
                          selectedSymptoms.includes(symptom) && styles.symptomTextSelected
                        ]}>
                          {symptom}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Medical History:</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Describe your medical history..."
                    value={medicalHistory}
                    onChangeText={(text: string) => setMedicalHistory(text)}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Question to ask:</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Ask your question..."
                    value={question}
                    onChangeText={(text: string) => setQuestion(text)}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#999"
                  />
                </View>

                <TouchableOpacity
                  style={styles.analyzeButton}
                  onPress={analyzeSymptoms}
                  activeOpacity={0.8}
                >
                  <View style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>ANALYZE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              // Results Section
              renderResults()
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    // React Native doesn't support CSS gradients, using solid color
    backgroundColor: '#1e3c72',
  },
  landingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: height,
  },
  heroContent: {
    maxWidth: 600,
    alignItems: 'center',
    width: '100%',
  },
  robotIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  robotEmoji: {
    fontSize: 80,
  },
  heroTitle: {
    fontSize: width < 400 ? 24 : 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  getStartedButton: {
    borderRadius: 25,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#00bcd4',
  },
  videoBtnGradient: {
    backgroundColor: '#00bcd4',
  },
  audioBtnGradient: {
    backgroundColor: '#4caf50',
  },
  newConsultBtnGradient: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  chatbotContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
    maxHeight: height - 40,
  },
  chatbotHeader: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#00bcd4',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  contentContainer: {
    flex: 1,
  },
  formSection: {
    padding: 30,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  symptomsList: {
    maxHeight: 200,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  symptomItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symptomItemSelected: {
    backgroundColor: '#00bcd4',
  },
  symptomText: {
    fontSize: 14,
    color: '#333',
  },
  symptomTextSelected: {
    color: 'white',
  },
  analyzeButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  resultsSection: {
    padding: 30,
    backgroundColor: '#f8f9fa',
  },
  resultItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00bcd4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  consultationButtons: {
    marginTop: 15,
  },
  consultationButton: {
    marginBottom: 10,
    borderRadius: 10,
  },
  newConsultationButton: {
    marginTop: 30,
    borderRadius: 10,
  },
});

export default PhysioAssistant;