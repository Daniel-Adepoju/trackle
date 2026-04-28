import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, type Href } from "expo-router";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        
        {/* Logo */}
        <View className="mb-8 items-center">
          <View className="w-28 h-28 rounded-3xl bg-muted items-center justify-center shadow-md">
            {/* Placeholder logo */}
            <Text className="text-4xl font-bold text-primary">T</Text>
          </View>

          <Text className="text-4xl font-bold text-foreground mt-6">
            trackle
          </Text>

          <Text className="text-muted-foreground mt-2 text-center">
            Track your subscriptions effortlessly
          </Text>
        </View>

        {/* Buttons */}
        <View className="w-full gap-4 mt-6">
          
          {/* Sign In */}
          <Link href={"/(auth)/signin" as Href} asChild>
            <TouchableOpacity className="bg-primary rounded-2xl py-4 items-center shadow-lg">
              <Text className="text-primary-foreground text-lg font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>

          {/* Sign Up */}
          <Link href={"/(auth)/signup" as Href} asChild>
            <TouchableOpacity className="border border-border rounded-2xl py-4 items-center">
              <Text className="text-foreground text-lg font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Optional footer */}
        {/* <View className="mt-10">
          <Text className="text-muted-foreground text-sm">
            Continue as guest
          </Text>
        </View> */}

      </View>
    </SafeAreaView>
  );
};

export default Onboarding;