import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import the new OutfitCard component
// Assuming HomeStackParamList and useNavigation are correctly configured for your navigation setup
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Correct import for StackNavigationProp
import { Outfit } from 'types/types';
import OutfitCard from 'components/OutfitCard';

// Define your RootStackParamList for navigation type safety
// This should be consistent with your main navigator definition (e.g., in App.tsx or navigation/types.ts)
type RootStackParamList = {
  Outfits: undefined;
  OutfitOverview: { outfitId: string };
  OutfitAdd: undefined; // Assuming you'll have an AddOutfitScreen
  // Add other screens like Items, ItemOverview, ItemAdd if they are in the same stack
};

// Dummy data for outfits to display (replace with actual data from Firestore later)
const dummyOutfits: Outfit[] = [
  { id: 'o1', name: 'Casual Weekend', category: 'Casual' },
  { id: 'o2', name: 'Summer Breeze', category: 'Summer'},
  { id: 'o3', name: 'Formal Evening', category: 'Formal'},
  { id: 'o4', name: 'Gym Ready', category: 'Activewear'},
  { id: 'o5', name: 'Winter Warmth', category: 'Winter'},
  { id: 'o6', name: 'Beach Day', category: 'Swimwear'},
];

const OutfitsScreen = () => {
  // State for selected wardrobe (placeholder for now)
  const [selectedWardrobe, setSelectedWardrobe] = useState('My Wardrobe');
  // Type the navigation hook with your RootStackParamList
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Dummy wardrobe options (replace with actual data from Firestore later)
  const wardrobeOptions = ['My Wardrobe', 'Summer Wardrobe', 'Winter Wardrobe'];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4'>
        {/* <Text className='text-3xl font-bold mb-6 text-center text-gray-800'>Your Outfits</Text> */}

        <View className='flex-row justify-between items-center mb-4'>
          <View className='flex-row items-center'>
            <TouchableOpacity className='border border-gray-300 rounded-md px-6 py-2 bg-gray-50'>
              <Text className='text-gray-800'>{selectedWardrobe}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className='bg-cyan-500 px-6 py-2 rounded-xl'
            onPress={() => navigation.navigate('OutfitAdd')}
          >
            <Text className='text-white text-base font-bold'>Add new Outfit</Text>
          </TouchableOpacity>
        </View>

        <View className='border-b border-gray-300 mb-4'></View>

        <FlatList
          data={dummyOutfits}
          renderItem={({ item }) =>
            <TouchableOpacity
              className='w-1/2'
              onPress={() => navigation.navigate('OutfitOverview', { outfitId: item.id })}
            >
              <OutfitCard outfit={item} />
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OutfitsScreen;
