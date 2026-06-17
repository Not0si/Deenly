import { useEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/stores/theme"
import { CheckOutlined, XmarkOutlined } from "@lineiconshq/free-icons"
import Lineicons from "@lineiconshq/react-native-lineicons"

type ItemProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  disabled?: boolean
}

const TRACK_WIDTH = 52
const TRACK_HEIGHT = 28
const THUMB_SIZE = 22
const TRACK_PADDING = 2
const THUMB_TRANSLATE = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2 - 2 // -2 for border width

export function Switch({
  checked,
  label,
  description,
  disabled = false,
  onChange,
}: ItemProps) {
  const colors = useTheme((s) => s.colors)

  const progress = useSharedValue(checked ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: 140,
      easing: Easing.out(Easing.cubic),
    })
  }, [checked])

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.bg_surface, colors.accent]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.border, colors.accent]
    ),
  }))

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * THUMB_TRANSLATE,
      },
    ],
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(progress.value ? 1 : 0.85) }],
    opacity: withTiming(0.8 + progress.value * 0.2),
  }))

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.bg_canvas },
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.fg }]}>{label}</Text>

        {description ? (
          <Text style={[styles.description, { color: colors.fg_surface }]}>
            {description}
          </Text>
        ) : null}
      </View>

      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View
          style={[styles.thumb, { backgroundColor: "#fff" }, thumbStyle]}
        >
          <Animated.View style={iconStyle}>
            <Lineicons
              icon={checked ? CheckOutlined : XmarkOutlined}
              size={14}
              color={checked ? colors.accent : colors.bg_canvas}
              strokeWidth={2.5}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 16,
  },

  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.45,
  },

  content: {
    flex: 1,
    paddingRight: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  description: {
    marginTop: 4,
    fontSize: 13,
  },

  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,

    borderWidth: 1,

    padding: TRACK_PADDING,
    justifyContent: "center",
  },

  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    elevation: 2,
  },
})
