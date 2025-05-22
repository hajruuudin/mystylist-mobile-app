import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='w-full p-4'>
        <Text className='text-4xl font-extrabold mb-8 text-center'>HomeScreen</Text>

        {/* My Wardrobe Section */}
        <Text className='text-2xl font-bold mb-2'>My Wardrobe</Text>
        <Text className='text-gray-600 mb-4'>Your recently added items to the wardrobe</Text>
        <View className='h-48 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Scrollable section for items</Text>
        </View>

        {/* My Outfits Section */}
        <Text className='text-2xl font-bold mb-2'>My Outfits</Text>
        <Text className='text-gray-600 mb-4'>Your recently added outfits</Text>
        <View className='h-48 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Scrollable section for outfits</Text>
        </View>

        {/* Wishlist Section */}
        <Text className='text-2xl font-bold mb-2'>Wishlist</Text>
        <Text className='text-gray-600 mb-4'>Keep an eye out for these items</Text>
        <View className='h-48 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Scrollable section for wishlist</Text>
        </View>

        {/* Style Quote Section */}
        <Text className='text-2xl font-bold mb-2'>Style quote</Text>
        <Text className='text-gray-600 mb-4'>Today's quote on styling</Text>
        <View className='h-24 bg-gray-100 rounded-lg mb-8 items-center justify-center'>
          <Text className='text-gray-400'>Placeholder for style quote</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;