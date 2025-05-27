import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from 'firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList, Outfit } from 'types/types';
import { OutfitCategoryPicker } from 'components/OutfitCategoryPicker';
import { getAuth } from 'firebase/auth';


// Placeholder for outfit categories (you might define specific ones later)
const outfitCategories = [
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'activewear', name: 'Activewear' },
  { id: 'sleepwear', name: 'Sleepwear' },
  { id: 'swimwear', name: 'Swimwear' },
  { id: 'work', name: 'Work' },
  { id: 'party', name: 'Party' },
];

const AddOutfitScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'OutfitAdd'>>();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const [selectOccasions, setSelectOcassions] = useState<string[]>([])
  const [selectSeasons, setSelectSeasons] = useState<string[]>([])
  const [pickerOcassionsVisible, setPickerOcassionsVisible] = useState<boolean>(false)
  const [pickerSeasonsVisible, setPickerSeasonsVisible] = useState<boolean>(false)

  const [outfitName, setOutfitName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [season, setSeason] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOcassionsAndSeasions(){
      const snapshotOcassion = await getDocs(collection(db, "outfit-occasion"));
      const ocassions = snapshotOcassion.docs.map(doc => doc.data().name);
      setSelectOcassions(ocassions)

      const snapshotWeather = await getDocs(collection(db, "weather-category"));
      const weather = snapshotWeather.docs.map(doc => doc.data().name)
      setSelectSeasons(weather)
    }

    fetchOcassionsAndSeasions()
  }, [])

  // Function to handle adding an outfit (no backend logic yet)
  const handleAddOutfit = async () => {
    const newOutfit: Outfit = {
      name: outfitName,
      description: description,
      season: season,
      occasion: occasion,
      style: style,
      items: selectedItems.split(',').map(item => item.trim()).filter(item => item),
      image: imageUri || undefined,
      userId: getAuth().currentUser?.uid
    };
    console.log('New Outfit Data:', newOutfit);
    // Here you would typically call a function to save to Firestore
    // For example: saveOutfitToFirestore(newOutfit);
     try{
        await addDoc(collection(db, 'outfits'), {
          ...newOutfit,
          createdAt: Timestamp.now()
        })
        Alert.alert('Success', 'Outfit added to your wardrobe!');
        navigation.navigate('Item')
      } catch (error){
        console.error(error)
      }

    // Optionally, clear the form after submission
    setOutfitName('');
    setCategory('');
    setDescription('');
    setSeason('');
    setOccasion('');
    setStyle('');
    setSelectedItems('');
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
        <Text className='text-3xl font-bold mb-6 text-center text-gray-800'>Add New Outfit</Text>

        <View className='mb-6 items-center'>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
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
            <Text className='text-white text-base font-bold'>Select Outfit Image</Text>
          </TouchableOpacity>
          <Text className='text-xs text-gray-500 mt-2 text-center'>
          </Text>
        </View>

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Outfit Name</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Cozy Winter Day'
          value={outfitName}
          onChangeText={setOutfitName}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Description</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800 h-24'
          placeholder='e.g., A warm and stylish outfit for cold weather.'
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Ocassion</Text>
        <TouchableOpacity
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 bg-gray-50'
          onPress={() => setPickerOcassionsVisible(true)}
        >
          <Text className='text-gray-800'>{occasion || 'Select an ocassion'}</Text>
        </TouchableOpacity>
        <OutfitCategoryPicker 
          visible={pickerOcassionsVisible}
          onClose={() => setPickerOcassionsVisible(false)}
          categories={selectOccasions}
          selected={occasion}
          onSelect={setOccasion}
        />

         <Text className='text-lg font-semibold text-gray-700 mb-2'>Season</Text>
        <TouchableOpacity
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 bg-gray-50'
          onPress={() => setPickerSeasonsVisible(true)}
        >
          <Text className='text-gray-800'>{season || 'Select a season'}</Text>
        </TouchableOpacity>
        <OutfitCategoryPicker 
          visible={pickerSeasonsVisible}
          onClose={() => setPickerSeasonsVisible(false)}
          categories={selectSeasons}
          selected={season}
          onSelect={setSeason}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Style</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Minimalist, Bohemian, Classic'
          value={style}
          onChangeText={setStyle}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Items in Outfit (comma-separated)</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-6 text-gray-800 h-24'
          placeholder='e.g., Blue Jeans, White T-Shirt, Leather Jacket'
          multiline
          numberOfLines={4}
          value={selectedItems}
          onChangeText={setSelectedItems}
        />
        <Text className='text-xs text-gray-500 mb-4'>
        </Text>

        <TouchableOpacity
          className='bg-green-600 px-6 py-4 rounded-xl shadow-md items-center'
          onPress={handleAddOutfit}
        >
          <Text className='text-white text-xl font-bold'>Add Outfit</Text>
        </TouchableOpacity>

        <View className='h-10'></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddOutfitScreen;
