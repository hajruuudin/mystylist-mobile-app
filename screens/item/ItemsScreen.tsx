import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard'; // Import the new ItemCard component
import { HomeStackParamList, Item, Wardrobe } from 'types/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'node_modules/@react-navigation/stack/lib/typescript/src/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';

const ItemsScreen = () => {
  const [wardrobes, setWardrobes] = useState<Wardrobe[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedWardrobe, setSelectedWardrobe] = useState<Wardrobe>();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  // 1. Fetch wardrobes only once
  useFocusEffect(
    useCallback(() => {
      const fetchUserWardrobes = async () => {
        const wardrobeRef = collection(db, 'wardrobes');
        const q = query(wardrobeRef, where('userID', '==', getAuth().currentUser?.uid));
        const snapshot = await getDocs(q);
        const wardrobes: Wardrobe[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            name: data.name,
            createdAt: data.createdAt?.toDate().toISOString() || '', 
            items: data.items || [],
            outfits: data.outfits || [],
          };
        });

        setWardrobes(wardrobes);
        if (wardrobes.length > 0) {
          setSelectedWardrobe(wardrobes[0]);
        }
      };

      fetchUserWardrobes();

      // no cleanup needed
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchItemsForWardrobe = async () => {
        if (!selectedWardrobe) return;
        const itemsRef = collection(db, 'items');
        const q = query(itemsRef, where('wardrobeId', '==', selectedWardrobe.id));
        const snapshot = await getDocs(q);
        const snapshotItems: Item[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            category: data.category,
            image: data.image,
            description: data.description,
            color: data.color,
            size: data.size,
            brand: data.brand,
            material: data.material,
            purchaseDate: data.purchaseDate,
            price: data.price,
            wardrobeId: data.wardrobeId,
          };
        });

        setItems(snapshotItems);
      };

      fetchItemsForWardrobe();
    }, [selectedWardrobe])
  );


  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4'>
        {/* Screen Title */}

        {/* Header Section: Wardrobe Selector and Add New Item Button */}
        <View className='flex-row justify-between items-center mb-4'>
          {/* Wardrobe Selector (Placeholder for a Picker/Dropdown) */}
          <View className='flex-row items-center'>
            {/* This would typically be a Picker/Dropdown component */}
            <TouchableOpacity className='border border-gray-300 rounded-md px-6 py-2 bg-gray-50'>
              <Text className='text-gray-800'>{selectedWardrobe?.name}</Text>
            </TouchableOpacity>
            {/* You would implement a modal or a proper picker here to change selectedWardrobe */}
          </View>

          {/* Add New Item Button */}
          <TouchableOpacity
            className='bg-cyan-500 px-6 py-2 rounded-xl'
            onPress={() => navigation.navigate('ItemAdd', {wardrobeId: selectedWardrobe!.id})} // Placeholder for navigation
          >
            <Text className='text-white text-base font-bold'>Add new Item</Text>
          </TouchableOpacity>
        </View>

        {/* Divider Line */}
        <View className='border-b border-gray-300 mb-4'></View>

        {/* Vertical Scroll Container for Items */}
        <FlatList
          data={items}
          renderItem={({ item: item }) =>  
            <TouchableOpacity
              className='w-1/2'
              onPress={() => navigation.navigate('ItemOverview', { itemId: item.id! })}
            >
              <ItemCard item={item} />
            </TouchableOpacity>
            }
          keyExtractor={(item) => item.id!}
          numColumns={2} // Display two items per row
          contentContainerStyle={{ paddingBottom: 20 }} // Add some padding at the bottom
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Distribute items evenly
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemsScreen;