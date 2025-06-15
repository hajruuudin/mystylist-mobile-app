import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList, Outfit } from 'types/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';

const { height: screenHeight } = Dimensions.get('window');
const FALLBACK_IMAGE = require('../../assets/404.png');

const OutfitOverviewScreen = ({ }) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>()
  const route = useRoute<RouteProp<HomeStackParamList, 'OutfitOverview'>>();
  const { outfitId } = route.params;

  const [outfit, setOutfit] = useState<Outfit>()

  useEffect(() => {
    async function fetchOutfit() {
      try {
        const collectionRef = collection(db, 'outfits')
        const q = query(collectionRef, where('__name__', '==', outfitId))

        const snapshot = await getDocs(q);
        const outfitSnaphot: Outfit[] = snapshot.docs.map(doc => {
          const data = doc.data()

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
          }
        })

        setOutfit(outfitSnaphot[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchOutfit()
  }, [])

  const deleteOutfit = async (outfitId: string) => {
    Alert.alert(
      'Delete Outfit',
      'Are you sure you want to delete this outfit?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteDoc(doc(db, 'outfits', outfitId));
            Alert.alert('Outfit Deleted', "Outfit sucessfully deleted", [], {
              cancelable: true,
              onDismiss: () => {navigation.navigate('Outfit')}
            })
          }
        }
      ],
      {
        cancelable: true,
        onDismiss: () => {}
      }
    )
  }

  if (!outfit) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">Outfit not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={{ height: screenHeight * 0.5 }}>
        <Image
          source={outfit.image ? { uri: outfit.image } : FALLBACK_IMAGE}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <SafeAreaView className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-3xl font-bold text-gray-800 mb-2">{outfit.name}</Text>

          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-700">Description:</Text>
            <Text className="text-base text-gray-800">{outfit.description || '—'}</Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-base font-semibold text-gray-700 mr-2">Season:</Text>
            <Text className="text-base text-gray-800">{outfit.season || '—'}</Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-base font-semibold text-gray-700 mr-2">Occasion:</Text>
            <Text className="text-base text-gray-800">{outfit.occasion || '—'}</Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-base font-semibold text-gray-700 mr-2">Style:</Text>
            <Text className="text-base text-gray-800">{outfit.style || '—'}</Text>
          </View>

          <View className="mb-2">
            <Text className="text-base font-semibold text-gray-700">Items in Outfit:</Text>
            {(outfit.items && outfit.items.length > 0) ? (
              outfit.items.map((item, index) => (
                <Text key={index} className="text-base text-gray-800 ml-4">- {item}</Text>
              ))
            ) : (
              <Text className="text-base text-gray-500 ml-4">—</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => deleteOutfit(outfit.id!)}
            className='bg-red-400 self-end px-6 rounded-xl py-2 my-2'
          >
            <Text className='text-white font-bold'>Delete Outfit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OutfitOverviewScreen;
