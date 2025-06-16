import { useFocusEffect } from '@react-navigation/native';
import ItemCard from 'components/ItemCard';
import OutfitCard from 'components/OutfitCard';
import WishlistCardSmall from 'components/WishlistCardSmall';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item, Outfit, WishlistItem } from 'types/types';

const HomeScreen = () => {
  const fashionQuotes = [
    {
      quote: "To achieve the nonchalance, which is the test of a perfect dresser, you must be exquisite in every detail.",
      person: "Hardy Amies"
    },
    {
      quote: "Fashion is architecture: it is a matter of proportions.",
      person: "Coco Chanel"
    },
    {
      quote: "Style is a way to say who you are without having to speak.",
      person: "Rachel Zoe"
    },
    {
      quote: "Fashion fades, only style remains the same.",
      person: "Coco Chanel"
    },
    {
      quote: "Don’t be into trends. Don’t make fashion own you, but you decide what you are, what you want to express by the way you dress and how you live.",
      person: "Gianni Versace"
    },
    {
      quote: "Fashion is not necessarily about labels. It’s not about brands. It’s about something else that comes from within you.",
      person: "Ralph Lauren"
    },
    {
      quote: "You can have anything you want in life if you dress for it.",
      person: "Edith Head"
    },
    {
      quote: "Style is knowing who you are, what you want to say, and not giving a damn.",
      person: "Orson Welles"
    },
    {
      quote: "Fashion is like eating, you shouldn't stick to the same menu.",
      person: "Kenzo Takada"
    }
  ];

  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [recentOutfits, setRecentOutfits] = useState<Outfit[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [currentQuote, setCurrentQuote] = useState<{quote: string, person: string}>(fashionQuotes[0])

  useFocusEffect(
    useCallback(() => {
      const fetchRecentItems = async () => {
        const itemsRef = collection(db, 'items')
        const q = query(itemsRef, where('userId', '==', getAuth().currentUser?.uid))

        const snapshot = await getDocs(q)
        const recentItemsSnapshot: Item[] = snapshot.docs.map(doc => {
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

        if (recentItemsSorted.length > 5) {
          const recentItemsSliced = recentItemsSorted.slice(0, 4)
          setRecentItems(recentItemsSliced)
        } else {
          setRecentItems(recentItemsSorted)
        }
      }

      fetchRecentItems()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      const fetchRecentOutfits = async () => {
        const outfitsRef = collection(db, 'outfits')
        const q = query(outfitsRef, where('userId', '==', getAuth().currentUser?.uid))

        const snapshot = await getDocs(q)
        const recentOutfitsSnapshot: Outfit[] = snapshot.docs.map(doc => {
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

        if (recentOutfitsSorted.length > 5) {
          const recentOutfitsSliced = recentOutfitsSorted.slice(0, 4)
          setRecentOutfits(recentOutfitsSliced)
        } else {
          setRecentOutfits(recentOutfitsSorted)
        }
      }

      fetchRecentOutfits()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      async function fetchWishlistItems() {
        const collectionRef = collection(db, 'wishlist-items')
        const q = query(collectionRef, where('userId', "==", getAuth().currentUser?.uid))

        const snapshot = await getDocs(q);
        const wishlistSnapshot: WishlistItem[] = snapshot.docs.map(doc => {
          const data = doc.data()

          return {
            id: doc.id,
            userId: data.userId,
            itemTitle: data.itemTitle,
            itemCategory: data.itemCategory,
            itemDescription: data.itemDescription,
            itemPlacesToBuy: data.itemPlacesToBuy,
            createdAt: data.createdAt
          }
        })

        if(wishlistSnapshot.length > 5){
          const wishlistSliced = wishlistSnapshot.slice(0, 4);
          setWishlistItems(wishlistSliced);
        } else {
          setWishlistItems(wishlistSnapshot);
        }
      }

      fetchWishlistItems()
    }, [])
  )

  useEffect(() => {
    function getRandomQuote(){
      setCurrentQuote(fashionQuotes[Math.floor(Math.random() * fashionQuotes.length)])
    }

    getRandomQuote()
  }, [])

  return (
    <SafeAreaView className='bg-white flex flex-col justify-start h-full w-full'>
      <ScrollView className='w-full h-full p-4'>
        <Text className='text-2xl text-center font-bold mb-2'>Welcome back!</Text>
        <Text className='text-gray-600 text-center mb-4'>Today's quote on styling</Text>
        <View className='h-32 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-black text-xl mb-2 text-center italic'>{currentQuote.quote}</Text>
          <Text className='text-gray-500'>{currentQuote.person}</Text>
        </View>

        <Text className='text-2xl font-bold mb-2'>My Wardrobe</Text>
        <Text className='text-gray-600'>Your recently added items to the wardrobe</Text>
        <View className='min-h-32 mb-8 rounded-xl bg-gray-100 p-2 mt-2'>
          { recentItems.length != 0 ? (
            <FlatList
            data={recentItems}
            keyExtractor={(item) => item.id!}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            renderItem={({ item }) => (
              <ItemCard item={item} variant='home' />
            )}
          />
          ) : (
            <View className='w-full flex-1 justify-center items-center'>
              <Text className='text-xl font-bold text-gray-600'>No Items In Your Wardrobe!</Text>
            </View>
          )}
        </View>

        <Text className='text-2xl font-bold mb-2'>My Outfits</Text>
        <Text className='text-gray-600'>Your recently added outfits</Text>
        <View className='min-h-32 mb-8 rounded-xl bg-gray-100 p-2 mt-2'>
          {recentOutfits.length != 0 ? (
            <FlatList
              data={recentOutfits}
              keyExtractor={(item) => item.id!}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
              renderItem={({ item }) => (
                <OutfitCard outfit={item} variant='home' />
              )}
            />
          ) : (
            <View className='w-full flex-1 justify-center items-center'>
              <Text className='text-xl font-bold text-gray-600'>No Outfits In Your Wardrobe!</Text>
            </View>
          )}
          
        </View>

        <Text className='text-2xl font-bold mb-2'>Wishlist</Text>
        <Text className='text-gray-600 mb-4'>Keep an eye out for these items</Text>
        <View className='min-h-32 bg-gray-100 rounded-lg mb-8 p-2 items-center justify-center'>
          {wishlistItems.length != 0 ? (
            <FlatList
              data={wishlistItems}
              keyExtractor={(item) => item.id!}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
              renderItem={({ item }) => (
                <WishlistCardSmall wishlistItem={item}/>
              )}
            />
          ) : (
            <View className='w-full flex-1 justify-center items-center'>
              <Text className='text-xl font-bold text-gray-600'>No Items In Your Wishlist!</Text>
            </View>
          )}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;