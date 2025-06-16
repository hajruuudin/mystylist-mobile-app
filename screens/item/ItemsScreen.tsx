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
            userId: data.userId
          };
        });

        setItems(snapshotItems);
      };

      fetchItemsForWardrobe();
    }, [selectedWardrobe])
  );


  if (items.length != 0) {
    return (
      <SafeAreaView className='flex-1 bg-gray-100'>
        <View className='p-4'>

          <View className='flex-row justify-center items-center mb-4'>
            <TouchableOpacity
              className='bg-cyan-500 px-6 py-2 rounded-xl'
              onPress={() => navigation.navigate('ItemAdd', { wardrobeId: selectedWardrobe!.id })}
            >
              <Text className='text-white text-base font-bold'>Add new Item</Text>
            </TouchableOpacity>
          </View>

          <View className='border-b border-gray-300 mb-4'></View>

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
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return(
      <SafeAreaView className='flex flex-col w-full h-full justify-center items-center'>
        <Text className='text-2xl font-bold'>No items in Your wardrobe! 👕</Text>
        <Text className='text-base text-gray-600'>Once you add items, they will appear here</Text>
        <TouchableOpacity
          className='bg-cyan-500 px-6 py-2 rounded-xl my-2'
          onPress={() => navigation.navigate('ItemAdd', { wardrobeId: selectedWardrobe!.id })}
        >
          <Text className='text-white text-base font-bold'>Add new Item</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

};

export default ItemsScreen;