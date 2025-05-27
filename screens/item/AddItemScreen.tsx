import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Item } from 'types/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { ItemCategoryPicker } from 'components/ItemCategoryPicker';

// Placeholder for item categories (consistent with ItemsScreen)
const itemCategories = [
  { id: 'tops', name: 'Tops', description: 'Shirts, blouses, tank tops, and other upper body garments.' },
  { id: 'bottoms', name: 'Bottoms', description: 'Pants, jeans, skirts, shorts, and similar lower body wear.' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets, coats, parkas, and any layering items for warmth.' },
  { id: 'footwear', name: 'Footwear', description: 'Shoes, boots, sandals, and other types of footwear.' },
  { id: 'accessories', name: 'Accessories', description: 'Hats, scarves, belts, watches, and jewelry.' },
  { id: 'dresses', name: 'Dresses', description: 'One-piece garments like dresses or jumpsuits.' },
  { id: 'activewear', name: 'Activewear', description: 'Gym wear, workout clothes, leggings, and sports bras.' },
  { id: 'undergarments', name: 'Undergarments', description: 'Underwear, bras, boxers, and other intimate apparel.' },
  { id: 'sleepwear', name: 'Sleepwear', description: 'Pajamas, nightgowns, loungewear for sleeping.' },
  { id: 'swimwear', name: 'Swimwear', description: 'Swimsuits, bikinis, trunks, and beachwear.' }
];

const AddItemScreen = () => {
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCategories() {
      const snapshot = await getDocs(collection(db, "item-category"));
      const cats = snapshot.docs.map(doc => doc.data().name);
      setSelectCategories(cats)
      console.log(cats)
    }

    fetchCategories()
  }, [])


  const [itemName, setItemName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Function to handle adding an item (no backend logic yet)
  const handleAddItem = () => {
    const newItem: Item = {
      id: 'temp-id-' + Date.now(), // Placeholder ID
      name: itemName,
      category: category,
      description: description,
      color: color,
      size: size,
      brand: brand,
      material: material,
      purchaseDate: purchaseDate,
      price: parseFloat(price) || 0, // Convert price to number
      image: imageUri || undefined,
    };
    console.log('New Item Data:', newItem);
    // Here you would typically call a function to save to Firestore
    // For example: saveItemToFirestore(newItem);

    // Optionally, clear the form after submission
    setItemName('');
    setCategory('');
    setDescription('');
    setColor('');
    setSize('');
    setBrand('');
    setMaterial('');
    setPurchaseDate('');
    setPrice('');
    setImageUri(null);
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
        setImageUri(uri);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-center text-gray-800'>Add New Item</Text>

        <View className='mb-6 items-center'>
          {imageUri ? (
            <Image
                source={typeof imageUri === 'string' ? { uri: imageUri } : require('../../assets/404.png')}
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
