import React from 'react';
import { View, Text, Image } from 'react-native';
import { Item, ItemShorthand } from 'types/types'

const FALLBACK_IMAGE = require('../assets/404.png')

interface ItemCardProps {
  item: Item;
  variant?: 'home' | 'default';
}

const ItemCard = ({ item, variant = 'default'  } : ItemCardProps) => {
  const imageUrl = item.image ? { uri: item.image } : FALLBACK_IMAGE;

  const widthVariant = variant == 'default' ? 'flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden' : 'flex-1 m-2 bg-white rounded-lg shadow-md overflow-hidden min-w-40'

  return (
    <View className={widthVariant}>
      <Image
        source={imageUrl}
        className='w-full h-32 object-cover rounded-t-lg'
        resizeMode='cover'
      />
      <View className='p-3 border-b-4 border-cyan-700 rounded-b-lg'>
        <Text className='text-base text-center font-semibold text-gray-800' numberOfLines={1}>
          {item.name}
        </Text>
        <Text className='text-sm text-center font-semibold text-white bg-cyan-700 rounded-lg py-1' numberOfLines={1}>
          {item.category}
        </Text>
      </View>
    </View>
  );
};

export default ItemCard;