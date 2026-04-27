import "@/global.css"

import { Link } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import { Image } from "react-native"
import avatar from "@/assets/images/avatar.png"
import { styled } from "nativewind"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { formatCurrency } from "@/lib/utils"
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from "@/constants/data"
import dayjs from "dayjs"
import ListHeading from "@/components/ListHeading"
import UpcomingSubCard from "@/components/UpcomingSubCard"
import { FlatList } from "react-native"
import { ScrollView } from "react-native"
import SubCard from "@/components/SubCard"
import { useState } from "react"

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
  const [expandedId, setExpandedId] = useState<string | null>("")

  return (
    <SafeAreaView className="flex-1 items-center bg-background p-5">
      {/* <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{ alignItems: "center" }}
      > */}

      <FlatList
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View className="self-center w-[90%] h-24 mt-4 flex-row items-center gap-4  mb-2">
              <Image
                source={avatar}
                style={{ width: 60, height: 60 }}
                className="rounded-full"
              />
              <Text className="text-xl font-sans-bold">Daniel </Text>

              <TouchableOpacity className="flex-row items-center gap-2 ml-auto rounded-full border-2 border-black/20 p-1">
                <IconSymbol
                  name="add"
                  size={28}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* Balance */}
            <View className="self-center w-[90%] h-32  rounded-bl-4xl rounded-tr-3xl p-4 mb-6  bg-primary  justify-between">
              <Text className="text-sm text-white ">Current Balance</Text>

              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-white text-2xl mt-1 font-bold font-sans-bold">
                  {formatCurrency(12345.67)}
                </Text>
                <Text className="text-white text-sm font-bold text-whitemt-1">
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM-DD")}
                </Text>
              </View>
            </View>

            {/* Upcoming Subscriptions */}
            <ListHeading title="Upcoming Subscriptions" />

            <FlatList
              data={UPCOMING_SUBSCRIPTIONS}
              style={{
                width: "100%",
                paddingLeft: 0,
                paddingBottom: 6,
                marginBlockStart: 20,
              }}
              renderItem={({ item }) => <UpcomingSubCard data={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text className="w-full text-center text-justify-center mx-auto text-lg font-sans-bold text-primary">
                  No Upcoming Renewals Yet
                </Text>
              )}
            />

            {/* All Subscriptions */}
            <ListHeading title="All Subscriptions" />
          </>
        )}
        data={HOME_SUBSCRIPTIONS}
        style={{
          width: "100%",
          // marginInline: "auto",
          // paddingBottom: 72,
        }}
        // contentContainerStyle={{ alignItems:'center'}}
        renderItem={({ item }) => (
          <SubCard
            data={item}
            expanded={expandedId === item?.id}
            onPress={() => setExpandedId(expandedId === item?.id ? null : item?.id)}
          />
        )}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerClassName="pb-26"
        ListEmptyComponent={() => (
          <Text className="w-full text-center text-justify-center mx-auto text-lg font-sans-bold text-primary">
            No Subscriptions Yet
          </Text>
        )}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}
