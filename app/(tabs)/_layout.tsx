import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/haptic-tab"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { Colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { processInsetBlock } from "react-native-reanimated/lib/typescript/css/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View } from "react-native"


const tabs = [
  {name:'index',title:'Home',iconName:'house.fill'},
  {name:'subscriptions',title:'Subscriptions',iconName:'heart.fill'},
  {name:'insights',title:'Insights',iconName:'trend.fill'},
  {name:'settings',title:'Settings',iconName:'gear.fill'},
  {name:'subscriptions/[id]',href:null},
]
export default function TabLayout() {
  const colorScheme = useColorScheme()
const insets = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveBackgroundColor:'#570861',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarButton: HapticTab,
        tabBarStyle: {
          position:'absolute',
          bottom:insets.bottom,
          height:68,
          marginHorizontal: 8,
          marginBlock: 12,
          paddingHorizontal:0,
          paddingTop: 0,
          borderRadius:35,
          borderTopWidth: 0,
          backgroundColor: Colors[colorScheme ?? 'light'].primary,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 4,
          marginVertical: 13,
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
        tabBarIconStyle: {
           alignItems: 'center',
            justifyContent: 'center',
        },
        // tabBarLabelStyle: {
        //   // display: 'none',
        //   fontSize: 12,
        //   fontWeight: '600',
        //   marginTop: 4,
        // },
      }}
    >
    {tabs.map((tab,index) => {
     return (
      <Tabs.Screen
        key={index}
        name={tab.name}
        options={{
          href:tab.href,
          title: tab.title,
          tabBarIcon: ({ color, focused}) => (
            <View className={`rounded-full ${focused ? 'bg-[#8c1a9b]' : 'bg-blend-color'} items-center justify-center w-14 h-14`}>

          
            <IconSymbol
              size={28}
              name={tab.iconName}
              color={color}
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
