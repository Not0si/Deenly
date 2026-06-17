import { useTheme } from "@/stores/theme"
import React, { createContext, ReactNode, useContext } from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"

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
  const selected = selectedValue === value

  return (
    <Pressable
      style={[
        { flexDirection: "row", alignItems: "center" },
        {
          backgroundColor: colors.bg_canvas,
          minHeight: 60,
          paddingHorizontal: 10,
        },
        disabled && styles.disabled,
      ]}
      onPress={() => {
        if (!disabled) onChange(value)
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>

      <View
        style={[
          styles.outer,
          { borderColor: colors.fg },
          selected && {
            borderColor: colors.accent,
            backgroundColor: colors.accent,
          },
          disabled && styles.outerDisabled,
        ]}
      >
        {selected && (
          <View style={{ ...styles.inner, backgroundColor: "#fff" }} />
        )}
      </View>
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

  /* disabled */
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
