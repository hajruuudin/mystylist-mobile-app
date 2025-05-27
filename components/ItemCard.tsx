import React from 'react';
import { View, Text, Image } from 'react-native';
import { Item, ItemShorthand } from 'types/types'

const FALLBACK_IMAGE = require('../assets/404.png')

// ItemCard component displays a single item with its image, name, and category.
const ItemCard = ({ item  } : {item: Item}) => {
  // Placeholder image URL - replace with actual image logic later
  const imageUrl = item.image ? { uri: item.image } : FALLBACK_IMAGE;

  return (
    <View className='flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Item Image */}
      <Image
        source={imageUrl}
        className='w-full h-32 object-cover rounded-t-lg'
        resizeMode='cover'
      />
      {/* Item Details */}
      <View className='p-3'>
        {/* Item Name */}
        <Text className='text-base font-semibold text-gray-800 mb-1' numberOfLines={1}>
          {item.name}
        </Text>
        {/* Item Category */}
        <Text className='text-sm text-gray-500' numberOfLines={1}>
          {item.category}
        </Text>
      </View>
    </View>
  );
};

export default ItemCard;