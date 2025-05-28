import { useFocusEffect } from '@react-navigation/native';
import ItemCard from 'components/ItemCard';
import OutfitCard from 'components/OutfitCard';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item, Outfit } from 'types/types';

const HomeScreen = () => {
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [recentOutfits, setRecentOutfits] = useState<Outfit[]>([]);

  // Fetch the recent items
  useFocusEffect(
    useCallback(() => {
      const fetchRecentItems = async () => {
        const itemsRef = collection(db, 'items')
        const q = query(itemsRef, where('userId', '==', getAuth().currentUser?.uid))

        const snapshot = await getDocs(q)
        const recentItemsSnapshot : Item[] = snapshot.docs.map(doc => {
          const data = doc.data()

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
            userId: data.userId,
            createdAt: data.createdAt?.toDate()
          };
        })

        const recentItemsSorted = recentItemsSnapshot.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });

        if(recentItemsSorted.length > 5){
          const recentItemsSliced = recentItemsSorted.slice(0, 4)
          setRecentItems(recentItemsSliced)
        } else {
          setRecentItems(recentItemsSorted)
        }
      }

      fetchRecentItems()
    }, [])
  )

  // Fetch the recent outfits
  useFocusEffect(
    useCallback(() => {
      const fetchRecentOutfits = async () => {
        const outfitsRef = collection(db, 'outfits')
        const q = query(outfitsRef, where('userId', '==', getAuth().currentUser?.uid))

        const snapshot = await getDocs(q)
        const recentOutfitsSnapshot : Outfit[] = snapshot.docs.map(doc => {
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
            userId: data.userId,
            createdAt: data.createdAt.toDate()
          };
        })

        const recentOutfitsSorted = recentOutfitsSnapshot.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });

        if(recentOutfitsSorted.length > 5){
          const recentOutfitsSliced = recentOutfitsSorted.slice(0, 4)
          setRecentOutfits(recentOutfitsSliced)
        } else {
          setRecentOutfits(recentOutfitsSorted)
        }
      }

      fetchRecentOutfits()
    }, [])
  )

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='w-full p-4'>
        
        {/* My Wardrobe Section */}
        <Text className='text-2xl font-bold mb-2'>My Wardrobe</Text>
        <Text className='text-gray-600'>Your recently added items to the wardrobe</Text>
        <View className='h-auto mb-8'>
          <FlatList
            data={recentItems}
            keyExtractor={(item) => item.id!}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0}}
            renderItem={({ item }) => (
              <ItemCard item={item} variant='home'/>
            )}
          />
        </View>

        {/* My Outfits Section */}
        <Text className='text-2xl font-bold mb-2'>My Outfits</Text>
        <Text className='text-gray-600 mb-4'>Your recently added outfits</Text>
        <View className='h-auto mb-8'>
          <FlatList
            data={recentOutfits}
            keyExtractor={(item) => item.id!}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0}}
            renderItem={({ item }) => (
              <OutfitCard outfit={item} variant='home'/>
            )}
          />
        </View>

        {/* Wishlist Section */}
        <Text className='text-2xl font-bold mb-2'>Wishlist</Text>
        <Text className='text-gray-600 mb-4'>Keep an eye out for these items</Text>
        <View className='h-48 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Scrollable section for wishlist</Text>
        </View>

        {/* Style Quote Section */}
        <Text className='text-2xl font-bold mb-2'>Style quote</Text>
        <Text className='text-gray-600 mb-4'>Today's quote on styling</Text>
        <View className='h-24 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Placeholder for style quote</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;