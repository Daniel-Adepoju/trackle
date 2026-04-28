import { useAuth } from "@clerk/expo"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

export function useAuthGuard() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      setHasChecked(true)
      if (!isSignedIn) {
        router.replace("/onboarding")
      }
    }
  }, [isLoaded, isSignedIn])

  return { isLoaded, isSignedIn, hasChecked }
}

export function useOnboardingGuard() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/(tabs)")
    }
  }, [isLoaded, isSignedIn])

  return { isLoaded, isSignedIn }
}
