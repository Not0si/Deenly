import { Div } from "@/components/ui/div"
import { Message } from "@/components/ui/message"
import { useCalendars } from "expo-localization"
import { router } from "expo-router"
import { Button } from "react-native"

export default function Salat() {
  const calendars = useCalendars()

  return (
    <Div style={{ flex: 1, flexDirection: "column" }}>
      <Button title='Go to Profile' onPress={() => router.push("/counter")} />

      <Message>{JSON.stringify(calendars)}</Message>
    </Div>
  )
}
