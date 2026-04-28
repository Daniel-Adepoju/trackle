import { useAuthGuard } from "@/hooks/use-auth"
import { Tabs } from "expo-router"
import React from "react"
import { ActivityIndicator, View } from "react-native"

import { IconSymbol } from "@/components/ui/icon-symbol"
import { Colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const tabs = [
  { name: "index", title: "Home", iconName: "house.fill" },
  { name: "subscriptions", title: "Subscriptions", iconName: "heart.fill" },
  { name: "insights", title: "Insights", iconName: "trend.fill" },
  { name: "settings", title: "Settings", iconName: "gear.fill" },
  { name: "subscriptions/[id]", href: null },
]
export default function TabLayout() {
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const { isLoaded, hasChecked } = useAuthGuard()

  if (!isLoaded || !hasChecked) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdf2f8",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#a855f7"
        />
      </View>
    )
  }
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveBackgroundColor:'#570861',
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom,
          height: 68,
          marginHorizontal: 8,
          marginBlock: 12,
          paddingHorizontal: 0,
          paddingTop: 0,
          borderRadius: 35,
          borderTopWidth: 0,
          backgroundColor: Colors[colorScheme ?? "light"].primary,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 4,
          marginVertical: 30,
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },
        // tabBarLabelStyle: {
        //   // display: 'none',
        //   fontSize: 12,
        //   fontWeight: '600',
        //   marginTop: 4,
        // },
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Tabs.Screen
            key={index}
            name={tab.name}
            options={{
              href: tab.href,
              title: tab.title,
              tabBarIcon: ({ color, focused }) => (
                <View
                  className={`rounded-full  ${focused ? "bg-[#8c1a9b]" : "bg-blend-color"} items-center justify-center w-12 h-12`}
                >
                  <IconSymbol
                    size={24}
                    name={tab.iconName}
                    color={color}
                    style={{ margin: "auto" }}
                  />
                </View>
              ),
            }}
          />
        )
      })}
    </Tabs>
  )
}
