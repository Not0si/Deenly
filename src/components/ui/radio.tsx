import { useLocale } from "@/stores/locale"
import { useTheme } from "@/stores/theme"
import React, { createContext, ReactNode, useContext, useEffect } from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

/* ---------------- Types ---------------- */

type RadioContextValue = {
  value: string
  onChange: (value: string) => void
}

type RadioProps = {
  value: string
  onChange: (value: string) => void
  children: ReactNode
  style?: ViewStyle
}

type ItemProps = {
  value: string
  children: ReactNode
  disabled?: boolean
}

/* ---------------- Context ---------------- */

const RadioContext = createContext<RadioContextValue | null>(null)

function useRadio() {
  const ctx = useContext(RadioContext)

  if (!ctx) {
    throw new Error("Radio.Item must be used inside Radio")
  }

  return ctx
}

/* ---------------- Root ---------------- */

function Radio({ value, onChange, children, style }: RadioProps) {
  const colors = useTheme((s) => s.colors)

  return (
    <RadioContext.Provider value={{ value, onChange }}>
      <View
        style={{
          ...(style ?? {}),
          width: "100%",
          backgroundColor: colors.bg_canvas,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {children}
      </View>
    </RadioContext.Provider>
  )
}

/* ---------------- Item ---------------- */

function Item({ value, children, disabled = false }: ItemProps) {
  const { value: selectedValue, onChange } = useRadio()
  const colors = useTheme((s) => s.colors)
  const dir = useLocale((s) => s.dir)
  const selected = selectedValue === value

  const progress = useSharedValue(selected ? 1 : 0)

  useEffect(() => {
    progress.value = withSpring(selected ? 1 : 0, {
      damping: 12,
      stiffness: 180,
      mass: 0.8,
    })
  }, [selected, progress])

  const outerAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.fg, colors.accent]
      ),
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["transparent", colors.accent]
      ),
      transform: [
        {
          scale: 1 + progress.value * 0.08,
        },
      ],
    }
  })

  const innerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          scale: progress.value,
        },
      ],
    }
  })

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          flexDirection: dir === "ltr" ? "row" : "row-reverse",
          alignItems: "center",
          backgroundColor: colors.bg_canvas,
          minHeight: 60,
          paddingHorizontal: 10,
          opacity: pressed ? 0.8 : 1,
        },
        disabled && styles.disabled,
      ]}
      onPress={() => {
        if (!disabled) {
          onChange(value)
        }
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>

      <Animated.View
        style={[
          styles.outer,
          outerAnimatedStyle,
          disabled && styles.outerDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.inner,
            { backgroundColor: "#fff" },
            innerAnimatedStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}

/* ---------------- Compound Export ---------------- */

Radio.Item = Item

export { Radio }

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  outer: {
    height: 22,
    width: 22,
    minWidth: 22,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 10,
  },

  inner: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },

  disabled: {
    opacity: 0.5,
  },

  outerDisabled: {
    borderColor: "#999",
  },

  labelDisabled: {
    color: "#999",
  },
})
