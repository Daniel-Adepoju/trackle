import { IconSymbol } from "@/components/ui/icon-symbol"
import { useAuth, useUser } from "@clerk/expo"
import dayjs from "dayjs"
import { router } from "expo-router"
import { styled } from "nativewind"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"

const SafeAreaView = styled(RNSafeAreaView)

const SettingItem = ({
  icon,
  title,
  value,
  onPress,
}: {
  icon: string
  title: string
  value?: string
  onPress?: () => void
}) => (
  <TouchableOpacity
    className="flex-row items-center py-4 px-4 border-b border-border"
    onPress={onPress}
    disabled={!onPress}
  >
    <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-4">
      <IconSymbol
        name={icon as any}
        size={20}
        color="#a855f7"
      />
    </View>
    <View className="flex-1">
      <Text
        className="text-foreground text-base"
        style={{ fontFamily: "sans-medium" }}
      >
        {title}
      </Text>
      {value && (
        <Text
          className="text-muted-foreground text-sm mt-1"
          style={{ fontFamily: "sans-regular" }}
        >
          {value}
        </Text>
      )}
    </View>
    {onPress && (
      <IconSymbol
        name="chevron.right"
        size={20}
        color="#6b5c7a"
      />
    )}
  </TouchableOpacity>
)

const Settings = () => {
  const { user } = useUser()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace("/(auth)/signin")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  // Get creation date from user metadata
  const createdAt = user?.createdAt ? dayjs(user.createdAt).format("MMMM D, YYYY") : "N/A"

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Header */}
        <View className="items-center py-8 px-4">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={{ width: 100, height: 100 }}
              className="rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center mb-4">
              <Text
                className="text-3xl text-white font-bold"
                style={{ fontFamily: "sans-bold" }}
              >
                {user?.firstName?.[0] || user?.username?.[0] || "?"}
              </Text>
            </View>
          )}

          <Text
            className="text-2xl font-semibold text-foreground"
            style={{ fontFamily: "sans-semibold" }}
          >
            {user?.fullName || user?.username || "User"}
          </Text>

          <Text
            className="text-muted-foreground mt-1"
            style={{ fontFamily: "sans-regular" }}
          >
            {user?.primaryEmailAddress?.emailAddress}
          </Text>

          {/* Sign Out Button */}
          <TouchableOpacity
            className="mt-4 px-6 py-3 bg-destructive/10 border border-destructive/20 rounded-full"
            onPress={handleSignOut}
          >
            <Text
              className="text-destructive font-semibold"
              style={{ fontFamily: "sans-semibold" }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View className="bg-card rounded-2xl mx-4 mb-4 overflow-hidden">
          <Text
            className="text-xs font-semibold text-muted-foreground uppercase px-4 py-3"
            style={{ fontFamily: "sans-semibold" }}
          >
            Account
          </Text>

          <SettingItem
            icon="person.fill"
            title="Name"
            value={
              user?.fullName ||
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
              "Not set"
            }
          />
          <SettingItem
            icon="envelope.fill"
            title="Email"
            value={user?.primaryEmailAddress?.emailAddress}
          />
          <SettingItem
            icon="calendar"
            title="Joined"
            value={createdAt}
          />
          <SettingItem
            icon="phone.fill"
            title="Phone"
            value={user?.primaryPhoneNumber?.phoneNumber || "Not set"}
          />
        </View>

        {/* Profile Section */}
        <View className="bg-card rounded-2xl mx-4 mb-4 overflow-hidden">
          <Text
            className="text-xs font-semibold text-muted-foreground uppercase px-4 py-3"
            style={{ fontFamily: "sans-semibold" }}
          >
            Profile
          </Text>

          <SettingItem
            icon="person.crop.circle"
            title="Edit Profile"
            onPress={() => {}}
          />
          <SettingItem
            icon="bell.fill"
            title="Notifications"
            onPress={() => {}}
          />
          <SettingItem
            icon="lock.fill"
            title="Security"
            onPress={() => {}}
          />
        </View>

        {/* App Section */}
        <View className="bg-card rounded-2xl mx-4 mb-4 overflow-hidden">
          <Text
            className="text-xs font-semibold text-muted-foreground uppercase px-4 py-3"
            style={{ fontFamily: "sans-semibold" }}
          >
            App
          </Text>

          <SettingItem
            icon="questionmark.circle.fill"
            title="Help & Support"
            onPress={() => {}}
          />
          <SettingItem
            icon="info.circle.fill"
            title="About"
            value="Version 1.0.0"
          />
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          className="bg-destructive/10 border border-destructive rounded-2xl mx-4 mb-8 py-4"
          onPress={handleSignOut}
        >
          <Text
            className="text-destructive text-center font-semibold"
            style={{ fontFamily: "sans-semibold" }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
