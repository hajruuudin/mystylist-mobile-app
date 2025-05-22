import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Dummy user (replace with actual Firebase user later)
const dummyUser = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe123',
  email: 'john.doe@example.com',
};

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-4">
        {/* Profile Icon Section */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
            <Ionicons name="person" size={48} color="#6B7280" />
          </View>
        </View>

        {/* User Info Section */}
        <View className="bg-gray-100 p-4 rounded-xl mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-1">
            Name: <Text className="font-normal">{dummyUser.firstName} {dummyUser.lastName}</Text>
          </Text>
          <Text className="text-lg font-semibold text-gray-700 mb-1">
            Username: <Text className="font-normal">{dummyUser.username}</Text>
          </Text>
          <Text className="text-lg font-semibold text-gray-700">
            Email: <Text className="font-normal">{dummyUser.email}</Text>
          </Text>
        </View>

        {/* Stats Placeholder */}
        <View className="bg-gray-200 h-40 rounded-xl items-center justify-center">
          <Text className="text-gray-500">User Stats Overview (Coming Soon)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
