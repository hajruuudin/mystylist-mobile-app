import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Outfit } from 'types/types';


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
  // State to hold form input values
  const [outfitName, setOutfitName] = useState<string>('');
  const [category, setCategory] = useState<string>(''); // Will hold selected category name
  const [description, setDescription] = useState<string>('');
  const [season, setSeason] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string>(''); // For now, a comma-separated string of item names
  const [imageUri, setImageUri] = useState<string | null>(null); // To store the selected image URI

  // Function to handle adding an outfit (no backend logic yet)
  const handleAddOutfit = () => {
    const newOutfit: Outfit = {
      id: 'temp-outfit-id-' + Date.now(), // Placeholder ID
      name: outfitName,
      category: category,
      description: description,
      season: season,
      occasion: occasion,
      style: style,
      items: selectedItems.split(',').map(item => item.trim()).filter(item => item), // Split comma-separated items
      image: imageUri || undefined,
      // createdAt will be set by Firestore serverTimestamp()
    };
    console.log('New Outfit Data:', newOutfit);
    // Here you would typically call a function to save to Firestore
    // For example: saveOutfitToFirestore(newOutfit);

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

  // Placeholder for image selection logic
  const handleImageSelection = () => {
    // In a real React Native app, you would use an image picker library here.
    // Example using a dummy image:
    const dummyImage = 'https://placehold.co/300x200/9370DB/FFFFFF?text=Selected+Outfit'; // A different placeholder color for outfits
    setImageUri(dummyImage);
    console.log('Simulating outfit image selection...');
    // Actual implementation would involve:
    // import * as ImagePicker from 'expo-image-picker';
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setImageUri(result.assets[0].uri);
    // }
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
            (In a real app, this would open camera/gallery)
          </Text>
        </View>

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Outfit Name</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Cozy Winter Day'
          value={outfitName}
          onChangeText={setOutfitName}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Category</Text>
        <TouchableOpacity
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 bg-gray-50'
          onPress={() => console.log('Open outfit category picker')}
        >
          <Text className='text-gray-800'>{category || 'Select a category'}</Text>
        </TouchableOpacity>

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Description</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800 h-24'
          placeholder='e.g., A warm and stylish outfit for cold weather.'
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Season</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Winter, Summer, All-Season'
          value={season}
          onChangeText={setSeason}
        />

        <Text className='text-lg font-semibold text-gray-700 mb-2'>Occasion</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-800'
          placeholder='e.g., Casual, Formal, Workout'
          value={occasion}
          onChangeText={setOccasion}
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
          (In a real app, this would be a multi-select from your existing items)
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
