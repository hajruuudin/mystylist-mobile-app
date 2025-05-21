import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {
  return (
    <SafeAreaView className='w-full h-full flex flex-col justify-start items-center'>
      <Text className='text-4xl font-extrabold'>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen