import { IconSymbol } from "@/components/ui/icon-symbol"
import { icons } from "@/constants/icons"
import clsx from "clsx"
import dayjs from "dayjs"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_COLORS: Record<Category, string> = {
  Entertainment: "#ff6b6b",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#f5c542",
  Productivity: "#a8e6cf",
  Cloud: "#dda15e",
  Music: "#f4a261",
  Other: "#c9ada7",
}

export interface CreateSubscriptionModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (subscription: any) => void
}

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly")
  const [category, setCategory] = useState<Category>("Entertainment")
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({})

   const resetForm = () => {
    setName("")
    setPrice("")
    setFrequency("Monthly")
    setCategory("Entertainment")
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    const priceNum = parseFloat(price)
    if (!price.trim() || isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const now = dayjs()
    const renewalDate = frequency === "Monthly" ? now.add(1, "month") : now.add(1, "year")

    const newSubscription = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      price: parseFloat(price),
      currency: "NGN",
      category,
      status: "active",
      startDate: now.toISOString(),
      renewalDate: renewalDate.toISOString(),
      billing: frequency,
      icon: icons.wallet,
      color: CATEGORY_COLORS[category],
      plan: `${frequency} Plan`,
      paymentMethod: "Not set",
    }

    onSubmit(newSubscription)
    resetForm()
    onClose()
  }

 

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-background ">
        <Pressable
          className="flex-1"
          onPress={onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="h-[90%]"
        >
          <View className="modal flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <Text className="text-xl font-sans-semibold text-foreground">New Subscription</Text>
              <TouchableOpacity onPress={onClose}>
                <IconSymbol
                  name="xmark"
                  size={24}
                  color="#6b5c7a"
                />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
              {/* Name Field */}
              <View className="mb-5">
                <Text className="text-sm font-sans-semibold text-foreground mb-2">Name</Text>
                <TextInput
                  className={clsx("auth-input", errors.name && "border-destructive")}
                  placeholder="e.g., Netflix"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#9ca3af"
                />
                {errors.name && (
                  <Text className="text-destructive text-xs mt-1">{errors.name}</Text>
                )}
              </View>

              {/* Price Field */}
              <View className="mb-5">
                <Text className="text-sm font-sans-semibold text-foreground mb-2">Price</Text>
                <TextInput
                  className={clsx("auth-input", errors.price && "border-destructive")}
                  placeholder="9.99"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
                {errors.price && (
                  <Text className="text-destructive text-xs mt-1">{errors.price}</Text>
                )}
              </View>

              {/* Frequency Toggle */}
              <View className="mb-5">
                <Text className="text-sm font-sans-semibold text-foreground mb-2">Frequency</Text>
                <View className="flex-row gap-3">
                  {["Monthly", "Yearly"].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      className={clsx(
                        "picker-option flex-1",
                        frequency === freq && "picker-option-active",
                      )}
                      onPress={() => setFrequency(freq as "Monthly" | "Yearly")}
                    >
                      <Text
                        className={clsx(
                          "text-center font-sans-medium",
                          frequency === freq ? "text-primary-foreground" : "text-foreground",
                        )}
                      >
                        {freq}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category Chips */}
              <View className="mb-6">
                <Text className="text-sm font-sans-semibold text-foreground mb-3">Category</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      className={clsx("category-chip", category === cat && "category-chip-active")}
                      onPress={() => setCategory(cat)}
                    >
                      <Text
                        className={clsx(
                          "font-sans-medium",
                          category === cat ? "text-primary-foreground" : "text-foreground",
                        )}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className={clsx("auth-button mb-8", !name.trim() && "auth-button-disabled")}
                onPress={handleSubmit}
                disabled={!name.trim()}
              >
                <Text className="text-white text-center font-sans-semibold">
                  Create Subscription
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}
