import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'firebaseConfig'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { WishlistItem } from 'types/types'

interface WishlistCardProps {
    wishlistItem: WishlistItem
}

const WishlistItemCard = ({wishlistItem} : WishlistCardProps) => {

    const removeWishlistitem = async (id?: string) => {
        try{
            await deleteDoc(doc(db, 'wishlist-items', id!))
            
            Toast.show({
                type: 'success',
                text1: 'Wishlist Item Deleted!',
                text2: 'Your item was successfully delete'
            });
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <View>
        <View className='w-full h-auto p-4 rounded-2xl bg-white mt-2'>
            <View className='w-full h-auto flex flex-row justify-between items-center'>
                <Text className='text-2xl font-bold'>{wishlistItem.itemTitle}</Text>
                <Text className='text-base bg-cyan-200 px-6 py-2 rounded-2xl font-semibold text-cyan-900'>{wishlistItem.itemCategory}</Text>
            </View>

            <View className='w-full h-0.5 bg-gray-200 my-4'></View>

            <Text className='text-start font-semibold'>Description</Text>
            <Text>{wishlistItem.itemDescription}</Text>

            <Text className='text-start font-semibold mt-2'>Places to buy</Text>
            <Text>{wishlistItem.itemPlacesToBuy}</Text>
        </View>
        <TouchableOpacity
            className='self-end bg-red-300 px-4 py-2 rounded-xl mt-2'
            onPress={() => removeWishlistitem(wishlistItem.id)}
        >
            <Text className='text-white font-semibold'>Remove item</Text>
        </TouchableOpacity>
    </View>
    
    
  )
}

export default WishlistItemCard