import { View, Text } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams()
    return (
    <View>
      <Text>Subscription Details: {id}</Text>
      <Link href="/subscriptions">Go back to Subscriptions</Link>
    </View>
  )
}

export default SubscriptionDetails