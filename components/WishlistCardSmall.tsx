import { View, Text } from 'react-native'
import React from 'react'
import { WishlistItem } from 'types/types'

interface WishlistCardSmallProps {
    wishlistItem: WishlistItem;
}

const WishlistCardSmall = ({wishlistItem} : WishlistCardSmallProps) => {
  return (
    <View className='w-32 h-auto p-4 bg-white m-2 rounded-xl flex flex-col justify-between items-center'>
      <Text className='text-center font-semibold'>{wishlistItem.itemTitle}</Text>
      <Text className='text-center'>{wishlistItem.itemCategory}</Text>
    </View>
  )
}

export default WishlistCardSmall