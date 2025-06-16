import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from 'firebaseConfig'
import { ItemCategoryPicker } from 'components/ItemCategoryPicker'
import { HomeStackParamList, WishlistItem } from 'types/types'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message'

const AddWishlistItemScreen = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>()

    const [selectCategories, setSelectCategories] = useState<string[]>([]);
    const [pickerVisible, setPickerVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchCategories() {
            const snapshot = await getDocs(collection(db, "item-category"));
            const cats = snapshot.docs.map(doc => doc.data().name);
            setSelectCategories(cats)
        }

        fetchCategories()
    }, [])

    const [itemTitle, setItemTitle] = useState<string>('');
    const [itemCategory, setItemCategory] = useState<string>('');
    const [itemDescription, setItemDescription] = useState<string>('');
    const [itemPlacesToBuy, setItemPlacesToBuy] = useState<string>('');

    const addItemHandler = async () => {
        if (itemTitle == '' || itemCategory == '' || itemDescription == '' || itemPlacesToBuy == '') {
            Alert.alert('Hold on', 'Please fill in all the form details!')
            return
        }

        const newWishlistItem: WishlistItem = {
            userId: getAuth().currentUser?.uid,
            itemTitle: itemTitle,
            itemCategory: itemCategory,
            itemDescription: itemDescription,
            itemPlacesToBuy: itemPlacesToBuy,
        }

        try {
            setLoading(true);
            await addDoc(collection(db, 'wishlist-items'), {
                ...newWishlistItem,
                createdAt: Timestamp.now()
            })
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Wishlist Item Added!',
                text2: 'Item added to wishlist!'
            })
            navigation.navigate('Wishlists')
        } catch (error) {
            console.error(error)
            Toast.show({
                type: 'error',
                text1: 'Oops, something went wrong!',
                text2: 'There was an error while adding the wishlist item!'
            })
        }

        setItemTitle('')
        setItemCategory('')
        setItemDescription('')
        setItemPlacesToBuy('')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <SafeAreaView className='w-full h-full bg-white'>
                <ScrollView className='bg-white p-4'>
                    <Text className='text-center text-3xl font-bold'>Add Item to Wishlist</Text>

                    <Text className='text-lg font-semibold text-gray-700 mb-2 mt-6'>Wishlist Item Title</Text>
                    <TextInput
                        className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
                        placeholder='e.g., Classic White Shirt'
                        value={itemTitle}
                        onChangeText={setItemTitle}
                    />

                    <Text className='text-lg font-semibold text-gray-700 mb-2'>Category</Text>
                    <TouchableOpacity
                        className='border border-gray-300 rounded-md px-4 py-3 mb-4 bg-gray-50'
                        onPress={() => setPickerVisible(true)}
                    >
                        <Text className='text-gray-800'>{itemCategory || 'Select a category'}</Text>
                    </TouchableOpacity>
                    <ItemCategoryPicker
                        visible={pickerVisible}
                        onClose={() => setPickerVisible(false)}
                        categories={selectCategories}
                        selected={itemCategory}
                        onSelect={setItemCategory}
                    />

                    <Text className='text-lg font-semibold text-gray-700 mb-2'>Item Description</Text>
                    <TextInput
                        className='border border-gray-300 h-24 rounded-md px-4 py-3 mb-4 text-gray-800'
                        placeholder='Describe what item and what purpose you need it for'
                        multiline
                        numberOfLines={4}
                        value={itemDescription}
                        onChangeText={setItemDescription}
                    />

                    <Text className='text-lg font-semibold text-gray-700 mb-2'>Places to buy</Text>
                    <TextInput
                        className='border border-gray-300 h-24 rounded-md px-4 mb-4 text-gray-800'
                        placeholder='Describe where you could buy this item, to remember for the future'
                        multiline
                        numberOfLines={4}
                        value={itemPlacesToBuy}
                        onChangeText={setItemPlacesToBuy}
                    />

                    <TouchableOpacity
                        className='px-4 py-4 w-auto bg-cyan-500 rounded-xl self-center'
                        onPress={addItemHandler}
                    >
                        <Text className='text-center text-xl font-bold text-white'>Add Wishilist Item</Text>
                    </TouchableOpacity>



                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default AddWishlistItemScreen