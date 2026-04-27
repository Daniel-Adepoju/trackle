import { View, Text, Image, Pressable } from "react-native"
import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils"
import clsx from "clsx"

const SubCard = ({
  data,
  expanded = false,
  onPress,
}: {
  data: any
  expanded?: boolean
  onPress?: () => void
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "bg-purple-200 w-[90%] self-center flex-row items-center justify-between gap-2 rounded-xl p-4 py-16 h-36 border mt-3",
        {
          "bg-purple-300": expanded,
        },
      )}
      style={!expanded && data?.color ? { backgroundColor: data?.color } : {}}
    >
      <View className="w-[70%]">
        {/* image */}
        <View className="w-full px-4 flex-row items-center justify-center gap-2">
          <View>
            <Image
              source={data?.icon}
              style={{ width: 34, height: 34 }}
            />
          </View>

          {/* name */}
          <View className="ml-2 w-[90%]">
            <Text
              className="font-sans-semibold w-full text-lg"
              numberOfLines={1}
            >
              {data?.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-sm font-medium text-muted-foreground"
            >
              {data?.category.trim() ||
                data?.plan.trim() ||
                (data?.renewDate ? formatSubscriptionDateTime(data?.renewDate) : "")}
            </Text>
          </View>
        </View>

        {expanded && (
          <View className="w-full mt-3  gap-2">
            <Text numberOfLines={1} className="font-medium">Renewal Date: {formatSubscriptionDateTime(data?.renewalDate)}</Text>
            <Text numberOfLines={1} className="font-medium">Status: {formatStatusLabel(data?.status || "Pending")}</Text>
          </View>
        )}
      </View>
      {/* price */}
      <View className="items-center gap-1 font-bold w-[20%]">
        <Text className="text-xl font-sans-bold">{formatCurrency(data?.price || 0)}</Text>
        <Text>{data?.billing}</Text>
      </View>
    </Pressable>
  )
}

export default SubCard
