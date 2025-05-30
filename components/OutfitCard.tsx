import { View, Text, Image } from 'react-native'
import React from 'react'
import { Outfit, OutfitShorthand } from 'types/types';

const FALLBACK_IMAGE = require('../assets/404.png')

interface OutfitCardProps {
  outfit: Outfit;
  variant?: 'home' | 'default';
}

// OutfitCard component displays a single outfit with its image and name.
const OutfitCard = ({ outfit, variant = 'default' }: OutfitCardProps) => {
  // Placeholder image URL - replace with actual image logic later
  const imageUrl = outfit.image ? { uri: outfit.image } : FALLBACK_IMAGE;

  const widthVariant = variant == 'default' ? 'flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden' : 'flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden min-w-40'

  return (
    <View className={widthVariant}>
      <Image
        source={imageUrl}
        className='w-full h-32 object-cover rounded-t-lg'
        resizeMode='cover'
      />
      <View className='p-3'>
        <Text className='text-base font-semibold text-gray-800 mb-1' numberOfLines={1}>
          {outfit.name}
        </Text>
        {outfit.occasion && (
          <Text className='text-sm text-gray-500' numberOfLines={1}>
            {outfit.occasion}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OutfitCard;