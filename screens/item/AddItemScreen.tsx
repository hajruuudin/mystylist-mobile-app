import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { HomeStackParamList, ImageFile, Item } from 'types/types';
import { addDoc, collection, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { ItemCategoryPicker } from 'components/ItemCategoryPicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';

const AddItemScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'ItemAdd'>>();
  const { wardrobeId } = route.params;
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<ImageFile>()
  const [wardrobe, setWardrobe] = useState<string>(wardrobeId)

  useEffect(() => {
    async function fetchCategories() {
      const snapshot = await getDocs(collection(db, "item-category"));
      const cats = snapshot.docs.map(doc => doc.data().name);
      setSelectCategories(cats)
    }

    fetchCategories()
  }, [])

  const handleAddItem = async () => {

    if(image){
      await addImageToStorage(image)
    }

    const newItem: Item = {
      name: itemName,
      category: category,
      description: description,
      color: color,
      size: size,
      brand: brand,
      material: material,
      purchaseDate: purchaseDate,
      price: parseFloat(price) || 0,
      image: imageUrl || '',
      wardrobeId: wardrobe,
      userId: getAuth().currentUser?.uid,
    };

    console.log(newItem)

    try{
      await addDoc(collection(db, 'items'), {
        ...newItem,
        createdAt: Timestamp.now()
      })
      Alert.alert('Success', 'Item added to your wardrobe!');
      navigation.navigate('Item')
    } catch (error){
      console.error(error)
    }

    setItemName('');
    setCategory('');
    setDescription('');
    setColor('');
    setSize('');
    setBrand('');
    setMaterial('');
    setPurchaseDate('');
    setPrice('');
    setImage(undefined);
    setImageUrl('');
  };

  /* IMAGE SELECTION LOGIC */
  const handleImageSelection = async () => {
    const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
    const response = await new Promise((resolve) => {
      Alert.alert('Select Image', 'Choose a source', [
        { text: options[0], onPress: () => resolve('camera') },
        { text: options[1], onPress: () => resolve('gallery') },
        { text: options[2], style: 'cancel', onPress: () => resolve(null) },
      ]);
    });

    if (!response) return;

    let result;

    if (response === 'camera') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return Alert.alert('Camera permission denied');

      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
      });
    } else {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return Alert.alert('Gallery permission denied');

      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.7,
      });
    }

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const imageFile = {
          uri,
          name: 'upload.jpg',
          type: 'image/jpeg',
          base64,
        };

        setImage(imageFile);
      }
    }
  };

  const addImageToStorage = async (imageFile : ImageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile.base64);

    const response = await fetch('https://api.imgbb.com/1/upload?key=ade70e133043cd3ca3cfc2f0e53a83fc', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setImageUrl(data.data.display_url)
    console.log(imageUrl);
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-center text-gray-800'>Add New Item</Text>

        <View className='mb-6 items-center'>
          {image ? (
            <Image
                source={typeof image?.uri === 'string' ? { uri: image?.uri } : require('../../assets/404.png')}
                className='w-48 h-48 rounded-lg mb-4'
                resizeMode='cover'
            />
            ) : (
            <View className='w-48 h-48 bg-gray-200 rounded-lg justify-center items-center mb-4'>
                <Text className='text-gray-500'>No Image Selected</Text>
            </View>
            )}
          <TouchableOpacity
            className='bg-blue-500 px-6 py-3 rounded-lg shadow-md'
            onPress={handleImageSelection}
          >
            <Text className='text-white text-base font-bold'>Select Image</Text>
          </TouchableOpacity>
          <Text className='text-xs text-gray-500 mt-2 text-center'>
          </Text>
        </View>

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Item Name</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Classic White Shirt'
          value={itemName}
          onChangeText={setItemName}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Category</Text>
        <TouchableOpacity
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 bg-gray-50'
          onPress={() => setPickerVisible(true)}
        >
          <Text className='text-gray-800'>{category || 'Select a category'}</Text>
        </TouchableOpacity>
        <ItemCategoryPicker
          visible={pickerVisible}
          onClose={() => setPickerVisible(false)}
          categories={selectCategories}
          selected={category}
          onSelect={setCategory}
        />


        <Text className='text-lg font-semibold text-gray-700 mb-2'>Description</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800 h-24'
          placeholder='e.g., Comfortable and versatile for all seasons.'
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Color</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Blue'
          value={color}
          onChangeText={setColor}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Size</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., M, L, 32W'
          value={size}
          onChangeText={setSize}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Brand</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Levi Strauss'
          value={brand}
          onChangeText={setBrand}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Material</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., 100% Cotton'
          value={material}
          onChangeText={setMaterial}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Purchase Date</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='YYYY-MM-DD'
          value={purchaseDate}
          onChangeText={setPurchaseDate}
          keyboardType='numeric'
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Price</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-6 text-gray-800'
          placeholder='e.g., 49.99'
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric'
        />

        <TouchableOpacity
          className='bg-green-600 px-6 py-4 rounded-xl shadow-md items-center'
          onPress={handleAddItem}
        >
          <Text className='text-white text-xl font-bold'>Add Item</Text>
        </TouchableOpacity>

        <View className='h-10'></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddItemScreen;
