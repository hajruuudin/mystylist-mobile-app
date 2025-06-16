import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList, Item, Outfit, User } from 'types/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { auth, db } from 'firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackNavigationProp } from '@react-navigation/stack';


const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>()
  const [loading, setLoading] = useState<boolean>(false);

  const logout = async () => {
    setLoading(true);
    const auth = getAuth();

    try {
      await signOut(auth);
      setLoading(false)
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const [user, setUser] = useState<User>()
  const [outfitCount, setOutfitCount] = useState<number>()
  const [itemCount, setItemCount] = useState<number>()
  const [mostPresentCategoy, setMostPresentCategory] = useState<string>()
  const [mostPresentOcassion, setMostPresentOcassion] = useState<string>()

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

      const fetchUserStats = async () => {
        const itemsCollectionRef = collection(db, 'items')
        const outfitsCollectionRef = collection(db, 'outfits')

        const itemsQuery = query(itemsCollectionRef, where('userId', '==', getAuth().currentUser?.uid))
        const outfitsQuery = query(outfitsCollectionRef, where('userId', '==', getAuth().currentUser?.uid))

        const itemsSnapshot = await getDocs(itemsQuery)
        const outfitsSnapshot = await getDocs(outfitsQuery)

        const items: Item[] = itemsSnapshot.docs.map((doc) => {
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
        })

        const outfits: Outfit[] = outfitsSnapshot.docs.map((doc) => {
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
        })

        const findMostPresentCategory = (items: Item[]): string => {
          const categories = [
            'accessories',
            'activewear',
            'bottoms',
            'dresses',
            'footwear',
            'outerwear',
            'sleepwear',
            'swimwear',
            'tops',
            'undergarments',
          ];

          const counts: { [key: string]: number } = {};

          for (const item of items) {
            const category = item.category.toLowerCase();
            if (categories.includes(category)) {
              counts[category] = (counts[category] || 0) + 1;
            }
          }

          let maxCount = 0;
          let mostCommonCategory = '';

          for (const category of categories) {
            const count = counts[category] || 0;
            if (count > maxCount) {
              maxCount = count;
              mostCommonCategory = category;
            }
          }

          return mostCommonCategory.slice(0, 1).toUpperCase() + mostCommonCategory.slice(1)
        };

        const findMostPresentOccasion = (outfits: Outfit[]): string => {
          const occasions = [
            'beach',
            'casual',
            'date',
            'formal',
            'interview',
            'loungewear',
            'party',
            'travel',
            'work',
            'workout'
          ];

          const counts: { [key: string]: number } = {};

          for (const outfit of outfits) {
            const occasion = outfit.occasion?.toLowerCase();
            if (occasion && occasions.includes(occasion)) {
              counts[occasion] = (counts[occasion] || 0) + 1;
            }
          }

          let maxCount = 0;
          let mostCommonOccasion = '';

          for (const occasion of occasions) {
            const count = counts[occasion] || 0;
            if (count > maxCount) {
              maxCount = count;
              mostCommonOccasion = occasion;
            }
          }

          return mostCommonOccasion.slice(0, 1).toUpperCase() + mostCommonOccasion.slice(1)
        };



        setItemCount(items.length)
        setOutfitCount(outfits.length)
        setMostPresentCategory(findMostPresentCategory(items))
        setMostPresentOcassion(findMostPresentOccasion(outfits))
      }

      fetchUserProfile()
      fetchUserStats()
    }, [])
  )

  if(user){
  return (
      <SafeAreaView className="flex-1 bg-white">
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
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

          <View className="bg-gray-200 h-auto py-6 rounded-xl items-center justify-center">
            <Text className="text-gray-500">Wardobe Stats</Text>

            <Text className='text-xl text-gray-600 mt-2 font-bold'>Number of Items</Text>
            <Text className='text-4xl font-bold mb-2'>{itemCount}</Text>

            <Text className='text-xl text-gray-600 mt-2 font-bold'>Number of Outfits</Text>
            <Text className='text-4xl font-bold mb-2'>{outfitCount}</Text>

            <Text className='text-xl text-gray-600 mt-2 font-bold'>Most present item</Text>
            <Text className='text-4xl font-bold mb-2'>{mostPresentCategoy}</Text>

            <Text className='text-xl text-gray-600 mt-2 font-bold'>Most present outfit ocassion</Text>
            <Text className='text-4xl font-bold mb-2'>{mostPresentOcassion}</Text>
          </View>

          <TouchableOpacity
            className='px-4 py-2 w-32 self-center my-4 bg-cyan-500 text-white rounded-2xl h-auto'
            onPress={() => logout()}
          >
            <Text className='text-white text-center text-2xl font-bold'>Logout</Text>
          </TouchableOpacity>
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
