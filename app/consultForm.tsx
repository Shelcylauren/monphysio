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

const pathologies = ["Rééducation", "Ostéopathie", "Massage"];

const painLocations = [
    { category: "Articulations", locations: ["Épaule", "Coude", "Poignet", "Hanche", "Genou", "Cheville"] },
    { category: "Colonne vertébrale", locations: ["Cou", "Dos", "Taille"] },
    { category: "Autres", locations: ["Scoliose"] }
];

const buttonBottomOffset: number = 30;
const progressStepsButtonNextText: string = "Suivant";
const progressStepsButtonPreviousText: string = "Précédent";
const progressStepsButtonFinishText: string = "Terminer";


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
    return (

        <View style={tw`relative flex-1 bg-white bg-blue-600`}>
            <View style={tw`z-10 flex-1`}>

                <ProgressSteps>
                    <ProgressStep
                        scrollable={false}
                        label="Informations Personnelles"
                        buttonNextText={progressStepsButtonNextText}
                        buttonBottomOffset={buttonBottomOffset}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Informations Personnelles
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
                                    label="Prénom *"
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
                                    label="Nom*"
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
                                    label="Ville*"
                                    placeholder="Ex: Paris"
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
                        label="Pathologie Ȧ Traiter"
                        buttonNextText={progressStepsButtonNextText}
                        buttonPreviousText={progressStepsButtonPreviousText}
                        buttonBottomOffset={buttonBottomOffset}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Pathologie Ȧ Traiter
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
                                            style={tw`flex-1 mx-1 px-3 py-2 rounded-md ${formData.pathology === item ? 'bg-blue-600' : 'bg-gray-100'
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
                                        <Picker.Item label="Sélectionnez une zone" value="" />
                                        {painLocations.map((group) =>
                                            group.locations.map((loc) => (
                                                <Picker.Item key={loc} label={`${group.category} - ${loc}`} value={loc} />
                                            ))
                                        )}
                                    </Picker>
                                </View>
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="Niveau de douleur (1-10)"
                                    placeholder="1"
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    leftIcon={<MaterialIcons name="height" size={20} color="#4B5563" />}
                                    // value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ProgressStep>
                    <ProgressStep 
                        scrollable={false} 
                        label="Informations Médicales"
                        buttonNextText={progressStepsButtonNextText}
                        buttonPreviousText={progressStepsButtonPreviousText}
                        buttonFinishText={progressStepsButtonFinishText}
                        buttonBottomOffset={buttonBottomOffset}
                    >
                        <Text style={tw`pb-2 mb-4 text-lg font-semibold text-center text-blue-200 border-b`}>
                            Informations médicales
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
                                    label="Traitements précédents"
                                    placeholder="Avez-vous déjà reçu des traitements pour ce problème ?"
                                    multiline
                                    // numberOfLines={3}
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    // value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="Antécédents médicaux"
                                    placeholder="Chirurgies, maladies chroniques"
                                    multiline
                                    // numberOfLines={3}
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    // value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                                <CustomTextInput
                                    // ref={emailRef}
                                    label="Médicaments actuels"
                                    placeholder="Médicaments que vous prenez actuellement"
                                    multiline
                                    textAlign='left'
                                    textAlignVertical='top'
                                    // numberOfLines={3}
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    // value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </ProgressStep>
                </ProgressSteps>
                {/* </KeyboardAwareScrollView> */}
            </View>
            <BGCircle position='bottom-right' />
        </View>
    )
}