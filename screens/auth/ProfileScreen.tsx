import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { User } from 'types/types';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';


const ProfileScreen = () => {
  const [user, setUser] = useState<User>()

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        const collectionRef = collection(db, 'users')
        const q = query(collectionRef, where('email', '==', getAuth().currentUser?.email))

        const snapshot = await getDocs(q);
        const users: User[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            createdAt: data.createdAt?.toDate().toISOString() || ''
          };
        })

        setUser(users[0])
      }

      fetchUserProfile()
    }, [])
  )

  if(user){
  return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-4">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
              <Ionicons name="person" size={48} color="#6B7280" />
            </View>
          </View>

          <View className="bg-gray-100 p-4 rounded-xl mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-1">
              Name: <Text className="font-normal">{user.firstName} {user.lastName}</Text>
            </Text>
            <Text className="text-lg font-semibold text-gray-700 mb-1">
              Username: <Text className="font-normal">{user.username}</Text>
            </Text>
            <Text className="text-lg font-semibold text-gray-700">
              Email: <Text className="font-normal">{user.email}</Text>
            </Text>
          </View>

          <View className="bg-gray-200 h-40 rounded-xl items-center justify-center">
            <Text className="text-gray-500">User Stats Overview (Coming Soon)</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return(
      <SafeAreaView className="flex-1 bg-white">
        <View className='w-full h-full flex flex-col justify-center items-center'>
          <Text className='text-base'>No User Logged In</Text>
        </View>
      </SafeAreaView>
    )
  }

};

export default ProfileScreen;
