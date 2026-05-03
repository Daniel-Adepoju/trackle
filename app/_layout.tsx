import "@/global.css"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { ClerkProvider } from "@clerk/expo"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack, usePathname, useGlobalSearchParams } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef } from "react"
import { tokenCache } from "@clerk/expo/token-cache"
import { PostHogProvider } from "posthog-react-native"
import { posthog } from "../src/config/posthog"

export const unstable_settings = {
  anchor: "(tabs)",
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  const colorScheme = useColorScheme()
  const pathname = usePathname()
  const params = useGlobalSearchParams()
  const previousPathname = useRef<string | undefined>(undefined)
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/Lato-Regular.ttf"),
    "sans-medium": require("../assets/fonts/Lato-Regular.ttf"),
    "sans-semibold": require("../assets/fonts/Lato-Bold.ttf"),
    "sans-bold": require("../assets/fonts/Lato-Bold.ttf"),
    "sans-light": require("../assets/fonts/Lato-Light.ttf"),
  })

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, { previous_screen: previousPathname.current ?? null, ...params })
      previousPathname.current = pathname
    }
  }, [pathname, params])

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!publishableKey) {
    return null
  }

  if (!fontsLoaded) {
    return null
  }
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ["testID"],
        }}
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

            {/* <Stack.Screen
              name="onboarding"
              options={{ headerShown: false }}
            /> */}
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </PostHogProvider>
    </ClerkProvider>
  )
}
