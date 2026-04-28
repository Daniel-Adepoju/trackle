import "@/global.css"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { ClerkProvider } from "@clerk/expo"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { tokenCache } from "@clerk/expo/token-cache"

export const unstable_settings = {
  anchor: "(tabs)",
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  if (!publishableKey) {
    return null
  }
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/Lato-Regular.ttf"),
    "sans-medium": require("../assets/fonts/Lato-Regular.ttf"),
    "sans-semibold": require("../assets/fonts/Lato-Bold.ttf"),
    "sans-bold": require("../assets/fonts/Lato-Bold.ttf"),
    "sans-light": require("../assets/fonts/Lato-Light.ttf"),
  })

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  )
}
