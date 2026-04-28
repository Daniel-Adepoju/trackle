import { useSignIn } from "@clerk/expo"
import { Link, useRouter, type Href } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { styled } from "nativewind"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
const SafeAreaView = styled(RNSafeAreaView)

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSignIn = async () => {
    setError("")

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    })

    if (error) return setError(error.message)
  }

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code })

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/(tabs)" as Href),
      })
    } else {
      setError("Verification incomplete")
    }
  }

  // MFA SCREEN
  if (signIn.status === "needs_client_trust") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <Text className="text-2xl font-bold mb-4">Verify Identity</Text>

          {error && <Text className="text-destructive mb-4">{error}</Text>}

          <TextInput
            className="border p-4 rounded-xl mb-4"
            placeholder="Enter code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            className="bg-primary rounded-xl py-4"
            onPress={handleVerify}
          >
            <Text className="text-white text-center">Verify</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
        className="my-24"
        contentContainerStyle={{ padding: 24 }}>
          <Text className="text-2xl font-bold mb-6">Welcome Back</Text>

          {error && <Text className="text-destructive mb-4">{error}</Text>}

          <TextInput
            placeholder="Email"
            className="border p-4 rounded-xl mb-3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            className="border p-4 rounded-xl mb-4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 shadow-md"
            onPress={handleSignIn}
            disabled={fetchStatus === "fetching"}
          >
            {fetchStatus === "fetching" ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="w-full flex-row justify-center mt-6">
            <Text>Don't have an account? </Text>
            <Link href={"/(auth)/signup" as Href}>
              <Text className="text-primary">Sign Up</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
