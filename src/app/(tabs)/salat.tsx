import { Div } from "@/components/ui/div"
import { router } from "expo-router"
import { Button } from "react-native"

export default function Salat() {
  return (
    <Div style={{ flex: 1, flexDirection: "column" }}>
      <Button title='Go to Profile' onPress={() => router.push("/counter")} />
    </Div>
  )
}
