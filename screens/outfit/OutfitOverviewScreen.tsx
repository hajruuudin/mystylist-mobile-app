import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from 'types/types';
import { RouteProp, useRoute } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window');

export interface Outfit {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  season?: string;
  occasion?: string;
  style?: string;
  items?: string[];
  createdAt?: string;
}

const dummyOutfit: Outfit = {
  id: 'o1',
  name: 'Casual Weekend Look',
  category: 'Casual',
  image: 'https://placehold.co/600x400/C8A2C8/FFFFFF?text=Outfit+Detail',
  description: 'A comfortable and stylish ensemble perfect for relaxed weekend activities.',
  season: 'Spring/Summer',
  occasion: 'Daytime, Weekend',
  style: 'Relaxed Casual',
  items: ['Blue Denim Jeans', 'White T-Shirt', 'Sneakers'],
  createdAt: '2024-05-20',
};

const FALLBACK_OUTFIT_IMAGE = require('../../assets/404.png');

type OutfitOverviewRouteProp = RouteProp<HomeStackParamList, 'OutfitOverview'>;

const OutfitOverviewScreen = () => {
  const route = useRoute<OutfitOverviewRouteProp>();
  const { outfitId } = route.params;

  const outfit = dummyOutfit.id === outfitId ? dummyOutfit : null;
  const imageUrl = outfit?.image ? { uri: outfit.image } : FALLBACK_OUTFIT_IMAGE;

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
          source={imageUrl}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <SafeAreaView className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-3xl font-bold text-gray-800 mb-2">{outfit.name}</Text>
          <Text className="text-xl text-gray-600 mb-4">{outfit.category}</Text>

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

          <View className="flex-row items-center mb-2">
            <Text className="text-base font-semibold text-gray-700 mr-2">Created On:</Text>
            <Text className="text-base text-gray-800">{outfit.createdAt || '—'}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OutfitOverviewScreen;
