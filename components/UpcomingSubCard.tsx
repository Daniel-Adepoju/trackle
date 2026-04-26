import { View, Text, Image } from 'react-native'
import React from 'react'
import { formatCurrency } from '@/lib/utils'

const UpcomingSubCard = ({data}: {data: any}) => {
  return (
    <View className='w-44 ml-2 h-30 border-3 border-primary rounded-lg bg-white p-3'>
     
     <View className="flex-row items-center gap-3 mb-2">
      <Image
        source={data.icon}
        style={{ width: 40, height: 40 }}
        className="rounded-full mb-2"
        tintColor={'purple'}
      />

      <View className='ml-auto'>
        <Text className='text-xs text-muted-foreground font-bold'>{formatCurrency(data.price,data.currency)}</Text>
        <Text numberOfLines={1} className='text-sm font-sans-light font-medium'>{data.daysLeft > 1 ? `${data.daysLeft} days left` : 'Last Day'}</Text>
      </View>
       </View>

      <Text className='text-sm font-sans-bold'>{data.name}</Text>
    </View>
  )
}

export default UpcomingSubCard