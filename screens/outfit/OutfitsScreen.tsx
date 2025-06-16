import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import the new OutfitCard component
// Assuming HomeStackParamList and useNavigation are correctly configured for your navigation setup
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Correct import for StackNavigationProp
import { HomeStackParamList, Outfit } from 'types/types';
import OutfitCard from 'components/OutfitCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';


const OutfitsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useFocusEffect(
    useCallback(() => {
      const fetchOutfits = async () => {
        const outfitsRef = collection(db, 'outfits');
        const q = query(outfitsRef, where('userId', '==', getAuth().currentUser?.uid));
        const snapshot = await getDocs(q);
        const snapshotOutfits: Outfit[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            season: data.season,
            occasion: data.occasion,
            style: data.style,
            items: data.items,
            image: data.image || undefined,
            userId: data.userId
          };
        });

        setOutfits(snapshotOutfits);
      };

      fetchOutfits();
    }, [])
  );

  if (outfits.length != 0) {
    return (
      <SafeAreaView className='flex-1 bg-gray-100'>
        <View className='p-4'>
          <View className='w-full flex-row justify-center items-center mb-4'>
            <TouchableOpacity
              className='bg-cyan-500 px-6 py-2 rounded-xl'
              onPress={() => navigation.navigate('OutfitAdd')}
            >
              <Text className='text-white text-base font-bold'>Add new Outfit</Text>
            </TouchableOpacity>
          </View>

          <View className='border-b border-gray-300 mb-4'></View>

          <FlatList
            data={outfits}
            renderItem={({ item: outfit }) =>
              <TouchableOpacity
                className='w-1/2'
                onPress={() => navigation.navigate('OutfitOverview', { outfitId: outfit.id! })}
              >
                <OutfitCard outfit={outfit} />
              </TouchableOpacity>
            }
            keyExtractor={(outfit) => outfit.id!}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className='flex flex-col w-full h-full justify-center items-center'>
        <Text className='text-2xl font-bold'>No outfits in Your wardrobe! 🧍🏻</Text>
        <Text className='text-base text-gray-600'>Once you add outfits, they will appear here</Text>
        <TouchableOpacity
          className='bg-cyan-500 px-6 py-2 rounded-xl my-2'
          onPress={() => navigation.navigate('OutfitAdd')}
        >
          <Text className='text-white text-base font-bold'>Add new Outfit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

};

export default OutfitsScreen;
