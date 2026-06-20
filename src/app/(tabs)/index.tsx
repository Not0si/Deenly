import { useGetPrayerTimes } from "@/apis"
import { Div } from "@/components/ui/div"
import { Message } from "@/components/ui/message"
import { useLocation } from "@/hooks/use-location"
import { Pressable } from "react-native"

export default function HomeScreen() {
  const {
    isLoading,
    location,
    isPermissionDenied,
    getCurrentLocation,
    clearLocation,
  } = useLocation()

  const { data } = useGetPrayerTimes(2026, 6, {
    latitude: location?.coords.latitude.toString(),
    longitude: location?.coords.longitude.toString(),
  })

  console.log({ data: data?.data })

  if (data?.data) {
    return (
      <Div>
        {data?.data.map((item, index) => {
          return (
            <Div key={index}>
              <Message>{JSON.stringify(item.timings.Isha)}</Message>
            </Div>
          )
        })}
      </Div>
    )
  }

  if (isLoading) {
    return (
      <Div>
        <Message>Loading...</Message>
      </Div>
    )
  }

  if (isPermissionDenied) {
    return (
      <Div>
        <Message>Access to location denied</Message>
      </Div>
    )
  }

  if (!isLoading && !location) {
    return (
      <Div>
        <Message>No Location Found</Message>
        <Pressable onPress={getCurrentLocation}>
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
      <Pressable onPress={clearLocation}>
        <Message>clear Location</Message>
      </Pressable>
    </Div>
  )
}
