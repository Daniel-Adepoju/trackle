import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ListHeading = ({title}: {title: string}) => {
  return (
    <View className='w-[90%] mb-2 mt-4'>
      <Text className='text-sm font-medium'>{title}</Text>
      <TouchableOpacity className='absolute right-5 top-0'>
        <Text className='text-sm rounded-xl border-2 border-black/20 py-1 px-6'>View All</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListHeading