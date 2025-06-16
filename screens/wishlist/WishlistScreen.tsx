import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import WishlistItemCard from 'components/WishlistItemCard'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from 'firebaseConfig'
import { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HomeStackParamList, WishlistItem } from 'types/types'


const WishlistScreen = () => {
    const navigator = useNavigation<StackNavigationProp<HomeStackParamList>>()

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

    useFocusEffect(
        useCallback(() => {
            const fetchWishlistItems = async () => {
                const collectionRef = collection(db, 'wishlist-items')
                const q = query(collectionRef, where('userId', "==", getAuth().currentUser?.uid))

                const snapspot = await getDocs(q);
                const wishlistItemsSnapshot : WishlistItem[] = snapspot.docs.map(doc => {
                    const data = doc.data()

                    return {
                        id: doc.id,
                        userId: data.userId,
                        itemTitle: data.itemTitle,
                        itemCategory: data.itemCategory,
                        itemDescription: data.itemDescription,
                        itemPlacesToBuy: data.itemPlacesToBuy,
                        createdAt: data.createdAt
                    }
                })

                setWishlistItems(wishlistItemsSnapshot)
            }
            fetchWishlistItems()
        }, [wishlistItems])
    )

    if(wishlistItems.length == 0){
        return(
            <View className='w-full h-full flex flex-col justify-center items-center p-2'>
                <Text className='font-semibold text-2xl'>No items in your wishlist found! 📋</Text>
                <Text className='mb-4 text-gray-500 text-base'>Add items to not forget what you want!</Text>
                <TouchableOpacity
                    className='bg-cyan-500 px-4 py-2 rounded-xl'
                    onPress={() => navigator.navigate('WishlistAdd')}
                >
                    <Text className='font-bold text-base text-white'>Add Item To Wishlist</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View className='w-full h-full flex flex-col justify-between items-center p-2'>
            <FlatList 
                data={wishlistItems}
                renderItem={({ item: item }) =>  
                    <WishlistItemCard
                        wishlistItem={item}
                    >
                    </WishlistItemCard>}
                keyExtractor={(item) => item.id!}
                contentContainerStyle={{ paddingBottom: 20 }}
            >

            </FlatList>
            <TouchableOpacity
                className='bg-cyan-400 px-4 py-2 rounded-xl'
                onPress={() => navigator.navigate('WishlistAdd')}
            >
                <Text className='font-bold text-base text-white'>Add Item To Wishlist</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WishlistScreen