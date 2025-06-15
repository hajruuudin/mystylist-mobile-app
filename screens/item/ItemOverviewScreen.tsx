 import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList, Item } from 'types/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { getAuth } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';

const { height: screenHeight } = Dimensions.get('window');
const FALLBACK_IMAGE = require('../../assets/404.png');

const ItemOverviewScreen = ({}) => { 
  const route = useRoute<RouteProp<HomeStackParamList, 'ItemOverview'>>();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>()
  const { itemId } = route.params;

  const [item, setItem] = useState<Item>()

  useEffect(() => {
    async function fetchItem(){
      try{
        const collectionRef = collection(db, 'items')
        const q = query(collectionRef, where('__name__', '==', itemId))

        const snapshot = await getDocs(q);
        const itemSnaphot : Item[] = snapshot.docs.map(doc => {
          const data = doc.data()

          return {
            id: doc.id,
            name: data.name,
            category: data.category,
            image: data.image,
            description: data.description,
            color: data.color,
            size: data.size,
            brand: data.brand,
            material: data.material,
            purchaseDate: data.purchaseDate,
            price: data.price,
            wardrobeId: data.wardrobeId,
            userId: getAuth().currentUser?.uid
          }
        })
      
        setItem(itemSnaphot[0])
      } catch (error){
        console.error(error)
      }
    }

    fetchItem()
  }, [])

  const deleteItem = async (itemId: string) => {
    Alert.alert(
    'Delete item',
    'Are you sure you want to delete this item from your wardrobe?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'items', itemId));
            Alert.alert('Item Delete Sucessfully');
            navigation.navigate('Item')
          } catch (error) {
            console.error(error)
          }
        }
      }
    ],
    {
      cancelable: true,
      onDismiss: () => {}
    },
  );

  }

  if (!item) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <Text className='text-lg text-gray-600'>Item not found.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={{ height: screenHeight * 0.4 }}>
        <Image
          source={item.image ? { uri: item.image } : FALLBACK_IMAGE}
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

          <TouchableOpacity
            onPress={() => deleteItem(item.id!)}
            className='bg-red-400 self-end px-6 rounded-xl py-2 my-2'
          >
            <Text className='text-white font-bold'>Delete Item</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ItemOverviewScreen;