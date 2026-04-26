import { View, Text } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import { styled } from "nativewind"
const SafeAreaView = styled(RNSafeAreaView)

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-background">
      <Text className=' text-2xl'>Insights</Text>
         <Text className='font-sans-bold text-2xl'>Insights</Text>
    </SafeAreaView>
  )
}

export default Insights