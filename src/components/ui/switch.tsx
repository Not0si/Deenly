import React, { createContext, ReactNode, useContext } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

/* ---------------- Types ---------------- */

type SwitchContextValue = {
  value: string
  onChange: (value: string) => void
}

type SwitchProps = {
  value: string
  onChange: (value: string) => void
  children: ReactNode
  style?: ViewStyle
}

type ItemProps = {
  value: string
  label: string
  disabled?: boolean
}

/* ---------------- Context ---------------- */

const SwitchContext = createContext<SwitchContextValue | null>(null)

function useSwitch() {
  const ctx = useContext(SwitchContext)
  if (!ctx) {
    throw new Error("Switch.Item must be used inside Switch")
  }
  return ctx
}

/* ---------------- Root ---------------- */

function Switch({ value, onChange, children, style }: SwitchProps) {
  return (
    <SwitchContext.Provider value={{ value, onChange }}>
      <View style={style}>{children}</View>
    </SwitchContext.Provider>
  )
}

/* ---------------- Item ---------------- */

function Item({ value, label, disabled = false }: ItemProps) {
  const { value: selectedValue, onChange } = useSwitch()

  const selected = selectedValue === value

  return (
    <TouchableOpacity
      style={[
        styles.item,
        selected && styles.itemSelected,
        disabled && styles.disabled,
      ]}
      onPress={() => {
        if (!disabled) onChange(value)
      }}
      activeOpacity={0.8}
    >
      <View style={[styles.dot, selected && styles.dotSelected]} />

      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

/* ---------------- Compound Export ---------------- */

Switch.Item = Item

export { Switch }

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f2f2f2",
  },
  itemSelected: {
    backgroundColor: "#e6f0ff",
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#aaa",
    marginRight: 10,
  },
  dotSelected: {
    backgroundColor: "#2f6fed",
  },

  label: {
    fontSize: 15,
    color: "#333",
  },
  labelSelected: {
    color: "#2f6fed",
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.5,
  },
  labelDisabled: {
    color: "#999",
  },
})
