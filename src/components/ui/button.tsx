import { useTheme } from "@/stores/theme"
import { GestureResponderEvent, Pressable, Text } from "react-native"

interface IProps {
  label: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export function Button({ label, disabled, onPress }: IProps) {
  const colors = useTheme((s) => s.colors)

  return (
    <Pressable
      style={(pressed) => [
        { flexDirection: "row", alignItems: "center" },
        {
          backgroundColor: colors.accent,
          minHeight: 60,
          paddingHorizontal: 10,
        },
        pressed && { transform: [{ scale: 0.8 }], opacity: 0.85 },
        disabled && {},
      ]}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </Pressable>
  )
}
