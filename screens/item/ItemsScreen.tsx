import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard'; // Import the new ItemCard component
import { HomeStackParamList } from 'types/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'node_modules/@react-navigation/stack/lib/typescript/src/types';

// Placeholder for item categories (as provided in your request)
const itemCategories = [
  { id: 'tops', name: 'Tops', description: 'Shirts, blouses, tank tops, and other upper body garments.' },
  { id: 'bottoms', name: 'Bottoms', description: 'Pants, jeans, skirts, shorts, and similar lower body wear.' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets, coats, parkas, and any layering items for warmth.' },
  { id: 'footwear', name: 'Footwear', description: 'Shoes, boots, sandals, and other types of footwear.' },
  { id: 'accessories', name: 'Accessories', description: 'Hats, scarves, belts, watches, and jewelry.' },
  { id: 'dresses', name: 'Dresses', description: 'One-piece garments like dresses or jumpsuits.' },
  { id: 'activewear', name: 'Activewear', description: 'Gym wear, workout clothes, leggings, and sports bras.' },
  { id: 'undergarments', name: 'Undergarments', description: 'Underwear, bras, boxers, and other intimate apparel.' },
  { id: 'sleepwear', name: 'Sleepwear', description: 'Pajamas, nightgowns, loungewear for sleeping.' },
  { id: 'swimwear', name: 'Swimwear', description: 'Swimsuits, bikinis, trunks, and beachwear.' }
];

// Dummy data for items to display (replace with actual data from Firestore later)
const dummyItems = [
  { id: '1', name: 'Blue Denim Jeans', category: itemCategories[1].name},
  { id: '2', name: 'White T-Shirt', category: itemCategories[0].name},
  { id: '3', name: 'Leather Jacket', category: itemCategories[2].name},
  { id: '4', name: 'Running Shoes', category: itemCategories[3].name},
  { id: '5', name: 'Red Scarf', category: itemCategories[4].name},
  { id: '6', name: 'Summer Dress', category: itemCategories[5].name},
  { id: '7', name: 'Workout Leggings', category: itemCategories[6].name},
  { id: '8', name: 'Black Socks', category: itemCategories[7].name},
];


const ItemsScreen = () => {
  // State for selected wardrobe (placeholder for now)
  const [selectedWardrobe, setSelectedWardrobe] = useState('My Wardrobe');
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  // Dummy wardrobe options (replace with actual data from Firestore later)
  const wardrobeOptions = ['My Wardrobe', 'Summer Wardrobe', 'Winter Wardrobe'];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4'>
        {/* Screen Title */}
        <Text className='text-3xl font-bold mb-6 text-center text-gray-800'>Your Items</Text>

        {/* Header Section: Wardrobe Selector and Add New Item Button */}
        <View className='flex-row justify-between items-center mb-4'>
          {/* Wardrobe Selector (Placeholder for a Picker/Dropdown) */}
          <View className='flex-row items-center'>
            {/* This would typically be a Picker/Dropdown component */}
            <TouchableOpacity className='border border-gray-300 rounded-md px-6 py-2 bg-gray-50'>
              <Text className='text-gray-800'>{selectedWardrobe}</Text>
            </TouchableOpacity>
            {/* You would implement a modal or a proper picker here to change selectedWardrobe */}
          </View>

          {/* Add New Item Button */}
          <TouchableOpacity
            className='bg-cyan-500 px-6 py-2 rounded-xl'
            onPress={() => navigation.navigate('ItemAdd')} // Placeholder for navigation
          >
            <Text className='text-white text-base font-bold'>Add new Item</Text>
          </TouchableOpacity>
        </View>

        {/* Divider Line */}
        <View className='border-b border-gray-300 mb-4'></View>

        {/* Vertical Scroll Container for Items */}
        <FlatList
          data={dummyItems}
          renderItem={({ item }) =>  
            <TouchableOpacity
              className='w-1/2'
              onPress={() => navigation.navigate('ItemOverview', { itemId: item.id })}
            >
              <ItemCard item={item} />
            </TouchableOpacity>
            }
          keyExtractor={(item) => item.id}
          numColumns={2} // Display two items per row
          contentContainerStyle={{ paddingBottom: 20 }} // Add some padding at the bottom
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Distribute items evenly
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemsScreen;