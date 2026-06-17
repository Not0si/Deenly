import { Div } from "@/components/ui/div"
import { Message } from "@/components/ui/message"
import { useLocale } from "@/stores/locale"
import { useTheme } from "@/stores/theme"
import { useRef, useState } from "react"
import { Animated, Pressable } from "react-native"

const LONG_PRESS_DURATION = 2 * 1000 // 2s

export default function Counter() {
  const [count, setCount] = useState(0)
  const [incrementDisabled, setIncrementDisabled] = useState(false)

  const translate = useLocale((s) => s.translate)
  const progress = useRef(new Animated.Value(0)).current

  const colors = useTheme((s) => s.colors)

  const increment = () => {
    if (incrementDisabled) return

    setCount((prev) => prev + 1)
    setIncrementDisabled(true)

    setTimeout(() => {
      setIncrementDisabled(false)
    }, 600)
  }

  const reset = () => {
    setCount(0)
  }

  const startLongPressAnimation = () => {
    progress.setValue(0)

    Animated.timing(progress, {
      toValue: 1,
      duration: LONG_PRESS_DURATION,
      useNativeDriver: false,
    }).start()
  }

  const stopLongPressAnimation = () => {
    progress.stopAnimation()
    progress.setValue(0)
  }

  return (
    <Div
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <Div>
        <Message type='h1'>{count}</Message>
      </Div>

      <Pressable
        onPress={increment}
        onLongPress={() => {
          reset()
          stopLongPressAnimation()
        }}
        onPressIn={startLongPressAnimation}
        onPressOut={stopLongPressAnimation}
        delayLongPress={LONG_PRESS_DURATION}
        disabled={incrementDisabled}
        style={{
          width: 200,
          height: 100,
          borderRadius: 4,
          justifyContent: "center",
          backgroundColor: incrementDisabled ? "gray" : colors.bg_canvas,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(102, 204, 43, 0.6)",
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          }}
        />

        <Message style={{ textAlign: "center" }}>
          {incrementDisabled ? "Wait..." : translate("1")}
        </Message>
      </Pressable>
    </Div>
  )
}
