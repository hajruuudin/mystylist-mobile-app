import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// Import auth, firestore, and serverTimestamp from your new firebaseConfig
import { auth, db } from '../../firebaseConfig'; // Adjust path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Specific function for creating user
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'; // Specific functions for Firestore

// Assuming AuthStackParamList and StackNavigationProp are still relevant for navigation types
import { AuthStackParamList } from 'types/types';
import { StackNavigationProp } from '@react-navigation/stack';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !email || !password || !repeatPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Use createUserWithEmailAndPassword from firebase/auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Use doc and setDoc from firebase/firestore
      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        username,
        email,
        createdAt: serverTimestamp(), // Use serverTimestamp from firebase/firestore
      });

      console.log('User registered:', uid);
      navigation.navigate('Login');
    } catch (error : any) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-2xl font-bold mb-6">Register</Text>

      <View className="flex-row w-full space-x-4">
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />
      </View>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none" // Ensure email is not auto-capitalized
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address" // Hint for email keyboard
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="w-full bg-tomato py-3 rounded-full items-center mb-6"
      >
        <Text className="text-white font-semibold text-base">Register</Text>
      </TouchableOpacity>

      <Text className="text-base text-gray-700">
        Already have an account?{' '}
        <Text
          className="text-tomato font-semibold"
          onPress={() => navigation.navigate('Login')}
        >
          Log In!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;
