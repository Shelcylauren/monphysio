import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CustomTextInput from '@/components/CustomInputText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import Form from '@/components/Form';
import BGCircle from '@/components/BGCircle';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { format, formatDistance, formatRelative, subDays, subYears } from 'date-fns'
import { router } from 'expo-router';
import { Button } from 'react-native'; // Add this import if not already present

interface FormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    city: string;
    pathology: string;
    painLocation: string;
    painLevel: string;
    painStart: string;
    previousTreatments: string;
    medicalHistory: string;
    medications: string;
}

interface Errors {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    
}

interface Touched {
    email: boolean;
    password: boolean;
    dateOfBirth: boolean;
    firstName: boolean;
    lastName: boolean;
}

interface PickerValueChangeEvent {
    type: string;
}

const pathologies = ["Rehabilitation", "Osteopathie", "Massage"];

const painLocations = [
    { category: "Articulations", locations: ["Shoulder", "Elbow", "Wrist", "Hip", "Knee", "Ankle"] },
    { category: "Spine", locations: ["Neck", "Back", "Waist"] },
    { category: "Others", locations: ["Scoliosis"] }
];

const buttonBottomOffset: number = 30;
const progressStepsButtonNextText: string = "Next";
const progressStepsButtonPreviousText: string = "Previous";
const progressStepsButtonFinishText: string = "Done";


export default function consultForm() {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        city: '',
        pathology: '',
        painLocation: '',
        painLevel: '1',
        painStart: '',
        previousTreatments: '',
        medicalHistory: '',
        medications: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

 
    const [progressErrors, setProgressErrors] = useState(false);




    const handleChange = (field: keyof FormData, value: string): void => {
        setFormData((prev: FormData) => ({ ...prev, [field]: value }));
        // Validation logic as before
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    const onPickerValueChange = (event: PickerValueChangeEvent, date?: Date | undefined): void => {
        if (event.type === 'set' && date) {
            // Handle the case when the user selects a date
            setFormData((prev: FormData) => ({ ...prev, dateOfBirth: format(date, 'dd / MM / yyyy') }));
            setDateOfBirth(date);
            toggleDatePicker();
        } else {
            // Handle the case when the user cancels the date picker
            setFormData((prev: FormData) => ({ ...prev, dateOfBirth: '' }));
            toggleDatePicker();
        }
    }

    const onNextStep = () => {
        // Handle the next button click for the current step
        console.log(`Next button clicked for step`);
        // You can add validation logic here if needed
        // For example, check if the required fields are filled
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.phone || !formData.email) {
            // Show an error message or highlight the fields
            setProgressErrors(true);
            console.log('Please fill in all required fields');
            return;
        } else {
            setProgressErrors(false);
        }
    }

    const onsubmit = async () => {
        try {
                // Here you can handle the form submission, e.g., send data to your backend or AI
                // Navigate to the next screen or perform any other actions
                router.push('/(screens)/appointment');
            } catch (error) {
                console.error('Error signing in:', error);
                // Handle the error, e.g., show an alert or a toast message
                // alert(getErrorMessage(error));
            }
        }

    return (
        <View style={tw`relative flex-1 bg-white bg-blue-600`}>
            <View style={tw`z-10 flex-1`}>
                <ProgressSteps>
                    <ProgressStep
                        scrollable={false}
                        label="Personal Information"
                        buttonNextText={progressStepsButtonNextText}
                        buttonBottomOffset={buttonBottomOffset}
                        onNext={onNextStep}
                        errors={progressErrors}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Personal Information
                        </Text>
                        <KeyboardAwareScrollView
                            style={tw`rounded-lg`}
                            enableOnAndroid={true}
                            enableAutomaticScroll={true}
                            extraScrollHeight={100}
                            keyboardShouldPersistTaps="handled"
                            scrollToOverflowEnabled={true}
                        >
                            <View style={tw`items-center p-4 bg-white rounded-lg`}>
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="FirstName *"
                                    placeholder="Ex: Shelcy"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="person" size={20} color="#4B5563" />}
                                    value={formData.firstName}
                                    onChangeText={(text) => handleChange('firstName', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="LastName *"
                                    placeholder="Ex: Youmbi"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="person" size={20} color="#4B5563" />}
                                    value={formData.lastName}
                                    onChangeText={(text) => handleChange('lastName', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />

                                {
                                    showDatePicker && (
                                        <RNDateTimePicker
                                            testID={'dateTimePicker'}
                                            value={dateOfBirth}
                                            mode="date"
                                            // display="default"
                                            maximumDate={subYears(new Date(), 18)}
                                            onChange={onPickerValueChange}
                                            style={tw`bg-blue-600`}
                                        />
                                    )
                                }

                                <TouchableOpacity activeOpacity={0.7} onPress={toggleDatePicker}>
                                    <CustomTextInput
                                        // ref={emailRef}
                                        label="Date Of Birth*"
                                        placeholder="Ex: DD / MM / YYYY"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        leftIcon={<MaterialIcons name="date-range" size={20} color="#4B5563" />}
                                        value={formData.dateOfBirth}
                                        // onChangeText={(text) => handleChange('dateOfBirth', text)}
                                        editable={false}
                                    />
                                </TouchableOpacity>

                                <CustomTextInput
                                    // ref={emailRef}
                                    label="Phone*"
                                    placeholder="Ex: 0123456789"
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="phone" size={20} color="#4B5563" />}
                                    value={formData.phone}
                                    onChangeText={(text) => handleChange('phone', text)}
                                    // error={errors.phone}
                                    // touched={touched.phone}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="City*"
                                    placeholder="Ex: Buea"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="location-city" size={20} color="#4B5563" />}
                                    value={formData.city}
                                    onChangeText={(text) => handleChange('city', text)}
                                    // error={errors.city}
                                    // touched={touched.city}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ProgressStep>
                    <ProgressStep
                        scrollable={false}
                        label="Pathology To Treat"
                        buttonNextText={progressStepsButtonNextText}
                        buttonPreviousText={progressStepsButtonPreviousText}
                        buttonBottomOffset={buttonBottomOffset}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Pathology To Treat
                        </Text>
                        <KeyboardAwareScrollView
                            style={tw`rounded-lg`}
                            enableOnAndroid={true}
                            enableAutomaticScroll={true}
                            extraScrollHeight={100}
                            keyboardShouldPersistTaps="handled"
                            scrollToOverflowEnabled={true}
                        >
                            <View style={tw`items-center p-4 bg-white rounded-lg`}>
                                <View style={tw`flex-row justify-between mb-4`}>
                                    {pathologies.map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            style={tw`flex-1 mx-1 px-2 py-2 rounded-md ${formData.pathology === item ? 'bg-blue-600' : 'bg-gray-100'
                                                }`}
                                            onPress={() => handleChange('pathology', item)}
                                        >
                                            <Text style={tw`text-center ${formData.pathology === item ? 'text-white font-bold' : 'text-gray-700'}`}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={tw`w-full mb-4 border border-gray-300 rounded-md bg-blue-50`}>
                                    <Picker
                                        selectedValue={formData.painLocation}
                                        onValueChange={(value) => handleChange('painLocation', value)}
                                        style={Platform.OS === 'android' ? tw`text-gray-700` : undefined}
                                    >
                                        <Picker.Item label="Select an area" value="" />
                                        {painLocations.map((group) =>
                                            group.locations.map((loc) => (
                                                <Picker.Item key={loc} label={`${group.category} - ${loc}`} value={loc} />
                                            ))
                                        )}
                                    </Picker>
                                </View>
                                <CustomTextInput
                                    label="Pain level (1-10)"
                                    placeholder="1"
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="height" size={20} color="#4B5563" />}
                                    onChangeText={(text) => handleChange('painLevel', text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ProgressStep>
                    <ProgressStep 
                        scrollable={false} 
                        label="Medical Information"
                        buttonNextText={progressStepsButtonNextText}
                        buttonPreviousText={progressStepsButtonPreviousText}
                        buttonFinishText={progressStepsButtonFinishText}
                        buttonBottomOffset={buttonBottomOffset}
                        onSubmit={onsubmit}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Medical information
                        </Text>
                        <KeyboardAwareScrollView
                            style={tw`rounded-lg`}
                            enableOnAndroid={true}
                            enableAutomaticScroll={true}
                            extraScrollHeight={100}
                            keyboardShouldPersistTaps="handled"
                            scrollToOverflowEnabled={true}
                        >
                            <View style={tw`items-center p-4 bg-white rounded-lg`}>
                                <CustomTextInput
                                    label="Previous treatments"
                                    placeholder="Have you ever received treatments for this problem?"
                                    multiline
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    onChangeText={(text) => handleChange('previousTreatments', text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                <CustomTextInput
                                    label="Medical history"
                                    placeholder="Surgeries, chronic diseases"
                                    multiline
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    onChangeText={(text) => handleChange('medicalHistory', text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                <CustomTextInput
                                    label="Current drugs"
                                    placeholder="Drugs you are currently taking"
                                    multiline
                                    textAlign='left'
                                    textAlignVertical='top'
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    onChangeText={(text) => handleChange('medications', text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ProgressStep>
                </ProgressSteps>
            </View>
            <BGCircle position='bottom-right' />
        </View>
    )
}