import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

// Define interfaces for data types
interface PainDataPoint {
  id: string;
  date: string;
  level: number;
  location: string;
  notes?: string;
}

interface MobilityDataPoint {
  id: string;
  date: string;
  rangeOfMotion: number;
  strength: number;
  flexibility: number;
  notes?: string;
}

interface ExerciseCompliance {
  id: string;
  week: string;
  prescribed: number;
  completed: number;
  performance: 'Good' | 'Average' | 'Needs improvement';
}

interface Milestone {
  id: string;
  description: string;
  date: string;
  achieved: boolean;
}

interface ProgressNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

// Component props interfaces
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface ProgressBarProps {
  percentage: number;
  color: string;
  label?: string;
  value?: string;
}

interface ChartBarProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
}

export default function PatientProgress(): React.JSX.Element {
  // Example data - in a real app, fetch from API/database
  const [painData] = useState<PainDataPoint[]>([
    { id: '1', date: 'Jan 15, 2025', level: 8, location: 'Lower back' },
    { id: '2', date: 'Feb 20, 2025', level: 6, location: 'Lower back' },
    { id: '3', date: 'Mar 27, 2025', level: 5, location: 'Lower back' },
    { id: '4', date: 'May 5, 2025', level: 3, location: 'Lower back' },
    { id: '5', date: 'Jun 18, 2025', level: 2, location: 'Lower back' },
  ]);
  
  const [mobilityData] = useState<MobilityDataPoint[]>([
    { id: '1', date: 'Jan 15, 2025', rangeOfMotion: 40, strength: 30, flexibility: 25 },
    { id: '2', date: 'Mar 27, 2025', rangeOfMotion: 55, strength: 45, flexibility: 40 },
    { id: '3', date: 'Jun 18, 2025', rangeOfMotion: 70, strength: 60, flexibility: 65 },
  ]);
  
  const [exerciseCompliance] = useState<ExerciseCompliance[]>([
    { id: '1', week: 'Jan 10-16', prescribed: 21, completed: 15, performance: 'Average' },
    { id: '2', week: 'Jan 17-23', prescribed: 21, completed: 18, performance: 'Good' },
    { id: '3', week: 'Jan 24-30', prescribed: 21, completed: 19, performance: 'Good' },
    { id: '4', week: 'May 1-7', prescribed: 14, completed: 14, performance: 'Good' },
    { id: '5', week: 'Jun 12-18', prescribed: 14, completed: 13, performance: 'Good' },
  ]);
  
  const [milestones] = useState<Milestone[]>([
    { id: '1', description: 'Walk 10 minutes without pain', date: 'Feb 28, 2025', achieved: true },
    { id: '2', description: 'Perform daily activities without assistance', date: 'Apr 15, 2025', achieved: true },
    { id: '3', description: 'Return to light sports activities', date: 'Jul 30, 2025', achieved: false },
    { id: '4', description: 'Full recovery - no restrictions', date: 'Sep 15, 2025', achieved: false },
  ]);
  
  const [progressNotes] = useState<ProgressNote[]>([
    { 
      id: '1', 
      date: 'Jan 15, 2025', 
      author: 'Dr. Smith',
      content: 'Initial assessment shows significant limited mobility in lumbar region. Starting with gentle stretches and core strengthening exercises.'
    },
    { 
      id: '2', 
      date: 'Mar 27, 2025', 
      author: 'Dr. Johnson',
      content: 'Patient showing good progress. Pain level reduced, mobility increasing. Intensifying exercise regimen gradually.'
    },
    { 
      id: '3', 
      date: 'Jun 18, 2025', 
      author: 'Dr. Smith',
      content: 'Excellent progress in mobility and strength. Pain now minimal. Transitioning to maintenance program with focus on prevention.'
    },
  ]);

  // Get the latest metrics for summary
  const latestPain = painData[painData.length - 1];
  const initialPain = painData[0];
  const latestMobility = mobilityData[mobilityData.length - 1];
  const initialMobility = mobilityData[0];

  // Calculate improvement percentages
  const painImprovement = Math.round(((initialPain.level - latestPain.level) / initialPain.level) * 100);
  const mobilityImprovement = Math.round(((latestMobility.rangeOfMotion - initialMobility.rangeOfMotion) / initialMobility.rangeOfMotion) * 100);
  const strengthImprovement = Math.round(((latestMobility.strength - initialMobility.strength) / initialMobility.strength) * 100);

  // Component for sections
  const Section: React.FC<SectionProps> = ({ title, children, icon }) => (
    <View style={tw`mx-4 mb-6 bg-white shadow-md rounded-xl`}>
      <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
        <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full`}>
          {icon}
        </View>
        <Text style={tw`text-lg font-bold text-blue-800`}>{title}</Text>
      </View>
      <View style={tw`p-4`}>
        {children}
      </View>
    </View>
  );

  // Component for progress bars
  const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color, label, value }) => (
    <View style={tw`mb-4`}>
      {label && (
        <View style={tw`flex-row justify-between mb-1`}>
          <Text style={tw`text-sm font-medium text-gray-700`}>{label}</Text>
          {value && <Text style={tw`text-sm font-bold text-gray-800`}>{value}</Text>}
        </View>
      )}
      <View style={tw`w-full h-4 overflow-hidden bg-gray-200 rounded-full`}>
        <View 
          style={[
            tw`h-full rounded-full`,
            { backgroundColor: color, width: `${Math.min(percentage, 100)}%` }
          ]}
        />
      </View>
    </View>
  );

  // Component for chart bars
  const ChartBar: React.FC<ChartBarProps> = ({ value, maxValue, label, color }) => {
    const percentage = (value / maxValue) * 100;
    
    return (
      <View style={tw`items-center`}>
        <View style={tw`relative w-8 h-32 mb-1 bg-gray-200 rounded-t-lg`}>
          <View 
            style={[
              tw`absolute bottom-0 w-full rounded-t-lg`,
              { backgroundColor: color, height: `${percentage}%` }
            ]}
          />
        </View>
        <Text style={tw`text-xs text-gray-600`}>{label}</Text>
        <Text style={tw`text-sm font-bold text-gray-800`}>{value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`flex-row items-center p-4 bg-white border-b border-gray-200 shadow-sm`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-2 mr-2 rounded-full bg-blue-50`}>
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-800`}>Your Progress</Text>
      </View>
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`py-4`}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Summary Section */}
        <Section 
          title="Progress Summary" 
          icon={<MaterialIcons name="trending-up" size={18} color="#3b82f6" />}
        >
          <View style={tw`p-3 mb-4 border border-green-100 rounded-lg bg-green-50`}>
            <Text style={tw`text-base font-medium text-green-700`}>
              {painImprovement}% Pain Reduction Since First Visit
            </Text>
          </View>
          
          <ProgressBar 
            percentage={painImprovement} 
            color="#10b981" 
            label="Pain Improvement" 
            value={`${painImprovement}%`}
          />
          
          <ProgressBar 
            percentage={mobilityImprovement} 
            color="#3b82f6" 
            label="Mobility Improvement" 
            value={`${mobilityImprovement}%`}
          />
          
          <ProgressBar 
            percentage={strengthImprovement} 
            color="#8b5cf6" 
            label="Strength Improvement" 
            value={`${strengthImprovement}%`}
          />
          
          <View style={tw`p-3 mt-4 border border-blue-200 rounded-lg bg-blue-50`}>
            <Text style={tw`text-sm text-blue-800`}>
              You're making excellent progress! Continue with your exercise regimen to maintain improvement.
            </Text>
          </View>
        </Section>
        
        {/* Pain Level Tracking */}
        <Section 
          title="Pain Level Over Time" 
          icon={<FontAwesome5 name="chart-line" size={18} color="#3b82f6" />}
        >
          <View style={tw`flex-row justify-around my-4`}>
            {painData.map((data, index) => (
              <ChartBar
                key={data.id}
                value={data.level}
                maxValue={10}
                label={data.date.substring(0, 6)}
                color={
                  data.level >= 7 ? "#ef4444" : 
                  data.level >= 4 ? "#f59e0b" : 
                  "#10b981"
                }
              />
            ))}
          </View>
          
          <View style={tw`mt-2 mb-3 border-t border-gray-200`} />
          
          <Text style={tw`mb-2 text-base font-medium text-gray-700`}>Recent Pain Assessment:</Text>
          <View style={tw`p-3 border border-gray-200 rounded-lg`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Date:</Text>
              <Text style={tw`font-medium text-gray-800`}>{latestPain.date}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Location:</Text>
              <Text style={tw`font-medium text-gray-800`}>{latestPain.location}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Pain Level:</Text>
              <Text 
                style={tw`font-medium ${
                  latestPain.level >= 7 ? "text-red-600" : 
                  latestPain.level >= 4 ? "text-yellow-600" : 
                  "text-green-600"
                }`}
              >
                {latestPain.level}/10
              </Text>
            </View>
          </View>
        </Section>
        
        {/* Mobility & Function */}
        <Section 
          title="Mobility & Function" 
          icon={<MaterialIcons name="accessibility" size={18} color="#3b82f6" />}
        >
          <View style={tw`flex-row justify-between gap-2 mb-4`}>
            <View style={tw`p-3 border border-blue-100 rounded-lg bg-blue-50`}>
              <Text style={tw`mb-1 text-sm text-gray-600`}>Range of Motion</Text>
              <Text style={tw`text-lg font-bold text-blue-700`}>{latestMobility.rangeOfMotion}%</Text>
              <Text style={tw`text-xs text-green-600`}>+{mobilityImprovement}%</Text>
            </View>
            
            <View style={tw`p-3 border border-purple-100 rounded-lg bg-purple-50`}>
              <Text style={tw`mb-1 text-sm text-gray-600`}>Strength</Text>
              <Text style={tw`text-lg font-bold text-purple-700`}>{latestMobility.strength}%</Text>
              <Text style={tw`text-xs text-green-600`}>+{strengthImprovement}%</Text>
            </View>
            
            <View style={tw`p-3 border border-indigo-100 rounded-lg bg-indigo-50`}>
              <Text style={tw`mb-1 text-sm text-gray-600`}>Flexibility</Text>
              <Text style={tw`text-lg font-bold text-indigo-700`}>{latestMobility.flexibility}%</Text>
              <Text style={tw`text-xs text-green-600`}>+40%</Text>
            </View>
          </View>
          
          {mobilityData.map((data, index) => (
            <View key={data.id} style={tw`mb-3 p-3 rounded-lg ${index === mobilityData.length - 1 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
              <Text style={tw`mb-2 text-sm font-medium ${index === mobilityData.length - 1 ? 'text-blue-700' : 'text-gray-700'}`}>
                Assessment: {data.date}
              </Text>
              <ProgressBar 
                percentage={data.rangeOfMotion} 
                color="#3b82f6" 
                label="Range of Motion" 
                value={`${data.rangeOfMotion}%`}
              />
              <ProgressBar 
                percentage={data.strength} 
                color="#8b5cf6" 
                label="Strength" 
                value={`${data.strength}%`}
              />
              <ProgressBar 
                percentage={data.flexibility} 
                color="#6366f1" 
                label="Flexibility" 
                value={`${data.flexibility}%`}
              />
            </View>
          ))}
        </Section>
        
        {/* Exercise Compliance */}
        <Section 
          title="Exercise Compliance" 
          icon={<MaterialIcons name="fitness-center" size={18} color="#3b82f6" />}
        >
          <Text style={tw`mb-3 text-gray-700`}>
            Your consistency with prescribed exercises:
          </Text>
          
          {exerciseCompliance.slice(-3).map((data) => (
            <View key={data.id} style={tw`mb-3 p-3 border rounded-lg ${
              data.performance === 'Good' ? 'border-green-100 bg-green-50' :
              data.performance === 'Average' ? 'border-yellow-100 bg-yellow-50' :
              'border-red-100 bg-red-50'
            }`}>
              <View style={tw`flex-row justify-between mb-2`}>
                <Text style={tw`font-medium text-gray-800`}>Week of {data.week}</Text>
                <View style={tw`px-2 py-0.5 rounded-full ${
                  data.performance === 'Good' ? 'bg-green-200' :
                  data.performance === 'Average' ? 'bg-yellow-200' :
                  'bg-red-200'
                }`}>
                  <Text style={tw`text-xs font-bold ${
                    data.performance === 'Good' ? 'text-green-800' :
                    data.performance === 'Average' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>{data.performance}</Text>
                </View>
              </View>
              
              <View style={tw`mb-2`}>
                <View style={tw`flex-row justify-between mb-1`}>
                  <Text style={tw`text-sm text-gray-600`}>Completion Rate</Text>
                  <Text style={tw`text-sm font-medium text-gray-800`}>{data.completed}/{data.prescribed} sessions</Text>
                </View>
                <View style={tw`w-full h-3 overflow-hidden bg-gray-200 rounded-full`}>
                  <View 
                    style={[
                      tw`h-full rounded-full`,
                      { 
                        backgroundColor: 
                          (data.completed/data.prescribed) >= 0.8 ? '#10b981' : 
                          (data.completed/data.prescribed) >= 0.6 ? '#f59e0b' : '#ef4444',
                        width: `${(data.completed/data.prescribed) * 100}%`
                      }
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity 
            style={tw`items-center justify-center p-3 mt-2 border border-blue-300 rounded-lg bg-blue-50`}
            // onPress={() => router.push('/exercise-tracking')}
          >
            <Text style={tw`font-medium text-blue-600`}>View All Exercise History</Text>
          </TouchableOpacity>
        </Section>
        
        {/* Treatment Milestones */}
        <Section 
          title="Treatment Milestones" 
          icon={<FontAwesome5 name="flag-checkered" size={18} color="#3b82f6" />}
        >
          {milestones.map((milestone) => (
            <View key={milestone.id} style={tw`flex-row mb-4`}>
              <View style={tw`items-center mr-4`}>
                <View style={tw`items-center justify-center w-8 h-8 rounded-full ${milestone.achieved ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <Ionicons name={milestone.achieved ? "checkmark" : "time"} size={18} color="white" />
                </View>
                <View style={tw`w-0.5 h-10 ${milestone.achieved ? 'bg-green-300' : 'bg-gray-200'}`} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-medium ${milestone.achieved ? 'text-green-700' : 'text-gray-700'}`}>
                  {milestone.description}
                </Text>
                <Text style={tw`text-sm ${milestone.achieved ? 'text-green-600' : 'text-gray-500'}`}>
                  {milestone.achieved ? 'Achieved on ' : 'Target: '}{milestone.date}
                </Text>
              </View>
            </View>
          ))}
        </Section>
        
        {/* Therapist Notes */}
        <Section 
          title="Therapist Notes" 
          icon={<MaterialIcons name="note" size={18} color="#3b82f6" />}
        >
          {progressNotes.map((note) => (
            <View key={note.id} style={tw`p-3 mb-4 border border-gray-200 rounded-lg`}>
              <View style={tw`flex-row justify-between pb-1 mb-2 border-b border-gray-100`}>
                <Text style={tw`font-medium text-gray-800`}>{note.author}</Text>
                <Text style={tw`text-sm text-gray-500`}>{note.date}</Text>
              </View>
              <Text style={tw`leading-5 text-gray-700`}>{note.content}</Text>
            </View>
          ))}
        </Section>
        
        {/* Action Button */}
        <View style={tw`mx-4 mb-10`}>
          <TouchableOpacity 
            style={tw`items-center justify-center p-4 bg-blue-600 rounded-lg shadow-sm`} 
            // onPress={() => router.push('/self-assessment')}
          >
            <Text style={tw`font-medium text-white`}>Submit New Self-Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
