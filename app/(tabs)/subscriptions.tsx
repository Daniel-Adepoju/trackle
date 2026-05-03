import { styled } from "nativewind"
import { useMemo, useState } from "react"
import { FlatList, Text, TextInput, View } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"

import SubCard from "@/components/SubCard"
import { useSubscriptions } from "@/components/SubscriptionsContext"

const SafeAreaView = styled(RNSafeAreaView)

const Subscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { subscriptions } = useSubscriptions()

  const filteredSubscriptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return subscriptions
    }

    return subscriptions.filter((subscription) => {
      return [subscription.name, subscription.category, subscription.plan, subscription.billing]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    })
  }, [searchQuery, subscriptions])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 pt-4">
        <Text className="mb-3 text-2xl font-sans-semibold text-foreground">Subscriptions</Text>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search subscriptions"
          placeholderTextColor="#9ca3af"
          className="mb-4 rounded-2xl border border-border bg-card px-4 py-3 text-base text-foreground"
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubCard
            data={item}
            expanded={expandedId === item.id}
            onPress={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerClassName="px-4 pb-24"
        ListEmptyComponent={() => (
          <Text className="mt-8 text-center text-base text-muted-foreground">
            No subscriptions match your search.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Subscriptions
