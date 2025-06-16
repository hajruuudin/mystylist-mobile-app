import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { KumbhSans_400Regular, KumbhSans_700Bold, KumbhSans_900Black, useFonts } from '@expo-google-fonts/kumbh-sans';

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      await setDoc(doc(db, 'users', uid), {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, 'wardrobes', uid), {
        userID: uid,
        name: 'My Wardrobe',
        items: [],
        outfits: [],
        createdAt: serverTimestamp(),
      });

      console.log('User registered:', uid);
      navigation.navigate('Login');
    } catch (error : any) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  let [fontsLoaded] = useFonts({
    KumbhSans_400Regular,
    KumbhSans_700Bold,
    KumbhSans_900Black
  });

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-4">
      <Text style={{fontFamily: 'KumbhSans_900Black'}} className="text-4xl font-bold mb-6">Register</Text>

      <View className="flex flex-row w-full space-x-2">
        <TextInput
          style={{fontFamily: 'KumbhSans_400Regular'}}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />
        <TextInput
          style={{fontFamily: 'KumbhSans_400Regular'}}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />
      </View>

      <TextInput
        style={{fontFamily: 'KumbhSans_400Regular'}}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        style={{fontFamily: 'KumbhSans_400Regular'}}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        style={{fontFamily: 'KumbhSans_400Regular'}}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        style={{fontFamily: 'KumbhSans_400Regular'}}
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="w-full bg-cyan-700 py-3 rounded-xl items-center mb-6"
      >
        <Text className="text-white font-semibold text-base">Register</Text>
      </TouchableOpacity>

      <Text className="text-base text-gray-700">
        Already have an account?{' '}
        <Text
          className="text-cyan-600 font-semibold"
          onPress={() => navigation.navigate('Login')}
        >
          Log In!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;
