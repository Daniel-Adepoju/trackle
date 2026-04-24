import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"
import "@/global.css"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { useFonts } from "expo-font"
import { useEffect } from "react"

export const unstable_settings = {
  anchor: "(tabs)",
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/Lato-Thin.ttf"),
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
    // <SafeAreaView>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
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
    // </SafeAreaView>
  )
}
