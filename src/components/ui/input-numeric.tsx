import React from "react"
import { StyleSheet } from "react-native"
import MaskInput, { createNumberMask } from "react-native-mask-input"

interface DecimalInputProps {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
}

// 1. Configure the number mask for decimal inputs
const decimalMask = createNumberMask({
  prefix: [],
  delimiter: "",
  separator: ".",
  precision: 2, // Max decimal places allowed (adjust or omit as needed)
  // showThousandsSeparator: false,
})

export function DecimalInput({
  value,
  onChangeText,
  placeholder = "0.00",
}: DecimalInputProps) {
  return (
    <MaskInput
      value={value}
      onChangeText={(masked, unmasked) => {
        // Pass either masked or unmasked back to parent
        onChangeText?.(masked)
      }}
      mask={decimalMask}
      keyboardType='decimal-pad'
      placeholder={placeholder}
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
})
