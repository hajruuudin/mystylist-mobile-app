 import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from 'types/types';
import { RouteProp, useRoute } from '@react-navigation/native';

// Get screen dimensions for responsive image height
const { height: screenHeight } = Dimensions.get('window');

// Define the Item interface for type safety
interface Item {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  color?: string;
  size?: string;
  brand?: string;
  material?: string;
  purchaseDate?: string;
  price?: number;
}

// Dummy data for a single item (replace with actual data fetched by ID later)
const dummyItem: Item = {
  id: '1',
  name: 'Blue Denim Jeans',
  category: 'Bottoms',
  description: 'Classic blue denim jeans, perfect for everyday wear. Features a straight fit and durable fabric.',
  color: 'Blue',
  size: 'M',
  brand: 'DenimCo',
  material: '100% Cotton',
  purchaseDate: '2023-01-15',
  price: 59.99,
};

const FALLBACK_IMAGE = require('../../assets/404.png');
type ItemOverviewRouteProp = RouteProp<HomeStackParamList, 'ItemOverview'>;

const ItemOverviewScreen = () => { 
  const item = dummyItem;
  const imageUrl = item.image ? { uri: item.image } : FALLBACK_IMAGE;

  if (!item) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <Text className='text-lg text-gray-600'>Item not found.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={{ height: screenHeight * 0.5 }}>
        <Image
          source={imageUrl}
          className='w-full h-full'
          resizeMode='cover'
        />
      </View>

      <SafeAreaView className='flex-1'>
        <ScrollView className='p-4'>
          <Text className='text-3xl font-bold text-gray-800 mb-2'>{item.name}</Text>
          <Text className='text-xl text-gray-600 mb-4'>{item.category}</Text>

          {item.description ? (
            <View className='mb-4'>
              <Text className='text-lg font-semibold text-gray-700'>Description:</Text>
              <Text className='text-base text-gray-800'>{item.description}</Text>
            </View>
          ) : null}

          {item.color ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Color:</Text>
              <Text className='text-base text-gray-800'>{item.color}</Text>
            </View>
          ) : null}

          {item.size ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Size:</Text>
              <Text className='text-base text-gray-800'>{item.size}</Text>
            </View>
          ) : null}

          {item.brand ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Brand:</Text>
              <Text className='text-base text-gray-800'>{item.brand}</Text>
            </View>
          ) : null}

          {item.material ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Material:</Text>
              <Text className='text-base text-gray-800'>{item.material}</Text>
            </View>
          ) : null}

          {item.purchaseDate ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Purchased On:</Text>
              <Text className='text-base text-gray-800'>{item.purchaseDate}</Text>
            </View>
          ) : null}

          {item.price !== undefined ? (
            <View className='flex-row items-center mb-2'>
              <Text className='text-base font-semibold text-gray-700 mr-2'>Price:</Text>
              <Text className='text-base text-gray-800'>${item.price.toFixed(2)}</Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ItemOverviewScreen;