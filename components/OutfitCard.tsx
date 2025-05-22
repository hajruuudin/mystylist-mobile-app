import { View, Text, Image } from 'react-native'
import React from 'react'
import { OutfitShorthand } from 'types/types';

const FALLBACK_IMAGE = require('../assets/404.png')

// OutfitCard component displays a single outfit with its image and name.
const OutfitCard = ({ outfit }: { outfit: OutfitShorthand }) => {
  // Placeholder image URL - replace with actual image logic later
  const imageUrl = outfit.image ? { uri: outfit.image } : FALLBACK_IMAGE;

  return (
    <View className='flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden'>
      <Image
        source={imageUrl}
        className='w-full h-32 object-cover rounded-t-lg'
        resizeMode='cover'
      />
      <View className='p-3'>
        <Text className='text-base font-semibold text-gray-800 mb-1' numberOfLines={1}>
          {outfit.name}
        </Text>
        {outfit.category && (
          <Text className='text-sm text-gray-500' numberOfLines={1}>
            {outfit.category}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OutfitCard;