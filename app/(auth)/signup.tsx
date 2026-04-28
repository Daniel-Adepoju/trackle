import { useSignUp, useAuth } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {styled} from "nativewind";
import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView)

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (error) return setError(error.message);

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    setError("");

    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: () => {
          router.replace("/(tabs)" as Href);
        },
      });
    } else {
      setError("Verification incomplete");
    }
  };

  if (isSignedIn || signUp.status === "complete") return null;

  // VERIFY SCREEN
  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address")
  ) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView 
          className="my-34 font-sans-regular"
          contentContainerStyle={{ padding: 24 }}>
            <Text className="text-2xl font-bold mb-2">
              Verify Email
            </Text>

            <Text className="mb-6 text-muted-foreground">
              Code sent to {email}
            </Text>

            {error && (
              <Text className="text-destructive mb-4">{error}</Text>
            )}

            <TextInput
              className="border p-4 rounded-xl mb-4"
              placeholder="Enter code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              className="bg-primary rounded-xl py-4 shadow-md"
              onPress={handleVerify}
              disabled={fetchStatus === "fetching"}
            >
              {fetchStatus === "fetching" ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center">
                  Verify
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // MAIN FORM
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
        className="my-24 font-sans-regular"
        contentContainerStyle={{ padding: 24 }}>
          <Text className="text-2xl font-bold mb-6">
            Create Account
          </Text>

          {error && (
            <Text className="text-destructive mb-4">{error}</Text>
          )}

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
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
          >
            {fetchStatus === "fetching" ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text>Already have an account? </Text>
            <Link href={"/(auth)/signin" as Href}>
              <Text className="text-primary">Sign In</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}