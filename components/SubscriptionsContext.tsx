import { HOME_SUBSCRIPTIONS } from "@/constants/data"
import { createContext, ReactNode, useContext, useState } from "react"

interface Subscription {
  id: string
  name: string
  price: number
  currency: string
  category: string
  status: string
  startDate: string
  renewalDate: string
  billing: string
  icon: any
  color: string
  plan: string
  paymentMethod: string
}

interface SubscriptionsContextType {
  subscriptions: Subscription[]
  addSubscription: (subscription: Subscription) => void
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined)
export function useSubscriptions() {
  const context = useContext(SubscriptionsContext)
  if (context === undefined) {
    throw new Error("useSubscriptions must be used within a SubscriptionsProvider")
  }
  return context
}

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(HOME_SUBSCRIPTIONS)

  const addSubscription = (subscription: Subscription) => {
    setSubscriptions((prev) => [subscription, ...prev])
  }

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </SubscriptionsContext.Provider>
  )
}
