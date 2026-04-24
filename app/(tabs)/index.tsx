import "@/global.css"

import { Link } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import { styled } from "nativewind"
const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
  return (
    <SafeAreaView className="flex flex-col flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">Welcome to Nativewind!</Text>
      {/* <Link
        href="/onboarding"
        className="mt-4 rounded bg-primary text-white px-4 py-2"
      >
        Onboard
        </Link> */}
      <View className="flex-row items-center justify-center gap-4 space-x-8">
        <Link
          href="/(auth)/signin"
          className="mt-4 rounded-sm bg-primary text-white font-bold px-6 py-2"
        >
          Sign In
        </Link>
        <Link
          href="/(auth)/signup"
          className="mt-4 rounded-sm bg-secondary text-white px-6 font-bold  py-2"
        >
          SIgn Up
        </Link>
      </View>
    </SafeAreaView>
  )
}
