import { Div } from "@/components/ui/div"
import { Message } from "@/components/ui/message"
import { locationRepository } from "@/repository/location"
import * as Location from "expo-location"
import { LocationObject } from "expo-location"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const initFunc = async () => {
      const cachedLocation = await locationRepository.get()

      setLocation(cachedLocation)
      setIsLoading(false)
    }

    initFunc()
  }, [])

  const onGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }

    let currentPosition = await Location.getCurrentPositionAsync({})

    await locationRepository.set(currentPosition)
    setLocation(currentPosition)
  }

  if (isLoading) {
    return (
      <Div>
        <Message>Loading...</Message>
      </Div>
    )
  }

  if (!isLoading && !location) {
    return (
      <Div>
        <Message>No Location Found</Message>
        <Pressable onPress={onGetLocation}>
          <Message>get Location</Message>
        </Pressable>
      </Div>
    )
  }

  return (
    <Div>
      <Message>Step 1: Try it</Message>
      <Message>{location?.coords.latitude}</Message>
      <Message>{location?.coords.longitude}</Message>
    </Div>
  )
}
