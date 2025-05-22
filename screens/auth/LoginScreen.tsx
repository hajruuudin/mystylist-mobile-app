import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import auth from your new firebaseConfig
import { auth } from '../../firebaseConfig'; // Adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth'; // Specific function for signing in

import { AuthStackParamList } from 'types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { KumbhSans_400Regular, KumbhSans_700Bold, KumbhSans_900Black, useFonts } from '@expo-google-fonts/kumbh-sans';


const LoginScreen = () => {
  const [email, setEmail] = useState(''); // Changed from username to email for authentication
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  let [fontsLoaded] = useFonts({
    KumbhSans_400Regular,
    KumbhSans_700Bold,
    KumbhSans_900Black
  });

  const handleLogin = async () => {
    if (!email || !password) { // Changed from username to email
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    
    try {
      // Use signInWithEmailAndPassword from firebase/auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Pass auth instance
      console.log('Logged in:', userCredential.user.email);
    } catch (error : any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-4">

      <View className='flex flex-row justify-center items-center'>
        {/* Placeholder for logo.png - ensure this path is correct or replace with a web-compatible image source */}
        {/* For Expo, you'll need to ensure 'logo.png' is in your assets folder and properly referenced */}
        <Image
          source={require('../../assets/logo.png')} 
          style={{ width: 120, height: 120, marginBottom: 24, marginRight: -5, transform: 'rotate(30deg)'}}
        />
        <Text className="text-5xl font-bold mb-2 -ml-5" style={{ fontFamily: 'KumbhSans_900Black' }}>
          MyStylist
        </Text>
      </View>

      <TextInput
        style={{ fontFamily: 'KumbhSans_400Regular' }}
        placeholder="Email" // Changed placeholder to Email
        value={email} // Changed state variable to email
        onChangeText={setEmail} // Changed setter to setEmail
        autoCapitalize="none" // Ensure email is not auto-capitalized
        keyboardType="email-address" // Hint for email keyboard
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      <TextInput
        style={{ fontFamily: 'KumbhSans_400Regular' }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-cyan-700 py-3 rounded-xl items-center mb-6"
      >
        <Text style={{ fontFamily: 'KumbhSans_700Bold' }} className="text-white font-semibold text-base">Log In</Text>
      </TouchableOpacity>

      <Text style={{ fontFamily: 'KumbhSans_400Regular' }} className="text-base text-gray-700">
        Don't have an account?{' '}
        <Text
        style={{fontFamily: 'KumbhSans_700Bold'}}
          className="text-cyan-9000"
          onPress={() => navigation.navigate('Register')}
        >
          Register!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
