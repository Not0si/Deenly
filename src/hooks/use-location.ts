import { locationRepository } from "@/repositories/location"
import * as Linking from "expo-linking"
import * as Location from "expo-location"
import { LocationObject } from "expo-location"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export function useLocation() {
  const [isLoading, setIsLoading] = useState(true)
  const [savedLocation, setSavedLocation] = useState<LocationObject | null>(
    null
  )
  const [isPermissionDenied, setIsPermissionDenied] = useState(false)

  useEffect(() => {
    const loadSavedLocation = async () => {
      const storedLocation = await locationRepository.get()

      setSavedLocation(storedLocation)
      setIsLoading(false)
    }

    loadSavedLocation()
  }, [])

  const getCurrentLocation = async () => {
    const { status, canAskAgain } =
      await Location.requestForegroundPermissionsAsync()

    if (status !== "granted") {
      setIsPermissionDenied(true)

      if (!canAskAgain) {
        Alert.alert(
          "Location Permission Required",
          "Location access has been denied. Please enable it in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        )
      }

      return
    }

    const currentLocation = await Location.getCurrentPositionAsync({})

    await locationRepository.set(currentLocation)
    setSavedLocation(currentLocation)
  }

  const clearLocation = async () => {
    await locationRepository.remove()
    setSavedLocation(null)
    setIsPermissionDenied(false)
  }

  return {
    getCurrentLocation,
    clearLocation,
    isLoading,
    location: savedLocation,
    isPermissionDenied,
  }
}
