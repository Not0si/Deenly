import { useInputStyle } from "@/hooks/use-input-style"
import { useLocale } from "@/stores/locale"
import { useEffect, useRef, useState } from "react"
import {
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  UIManager,
  View,
} from "react-native"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export type NumberType = "float" | "ufloat" | "int" | "uint"

export interface InputNumberProps {
  isError?: boolean | string
  placeholder?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  editable?: boolean
  type?: NumberType
  value?: number | null
  onChangeValue?: (value: number | null, rawText: string) => void
  max?: number
}

export default function InputNumber({
  isError,
  placeholder,
  leftIcon,
  rightIcon,
  value = null,
  onChangeValue,
  editable = true,
  type = "float",
  max = Number.MAX_SAFE_INTEGER,
}: InputNumberProps) {
  const { inputStyles } = useInputStyle()
  const isRTL = useLocale((s) => s.dir) === "rtl"
  const [isFocused, setIsFocused] = useState(false)

  const [textValue, setTextValue] = useState<string>(
    value !== null && value !== undefined ? String(value) : ""
  )

  const inputRef = useRef<RNTextInput>(null)

  useEffect(() => {
    const currentParsed = type.includes("int")
      ? parseInt(textValue, 10)
      : parseFloat(textValue)

    if (value === null || value === undefined) {
      if (textValue !== "" && textValue !== "-") {
        setTextValue("")
      }
    } else if (currentParsed !== value) {
      setTextValue(String(value))
    }
  }, [value])

  const filterInput = (text: string): string => {
    let sanitized = text

    switch (type) {
      case "uint":
        sanitized = text.replace(/[^0-9]/g, "")
        break

      case "int":
        sanitized = text.replace(/(?!^-)[^0-9]/g, "")
        if (sanitized.indexOf("-") > 0) {
          sanitized = "-" + sanitized.replace(/-/g, "")
        }
        break

      case "ufloat": {
        sanitized = text.replace(/[^0-9.]/g, "")
        const parts = sanitized.split(".")
        if (parts.length > 2) {
          sanitized = parts[0] + "." + parts.slice(1).join("")
        }
        break
      }

      case "float":
      default: {
        sanitized = text.replace(/(?!^-)[^0-9.]/g, "")
        if (sanitized.indexOf("-") > 0) {
          sanitized = "-" + sanitized.replace(/-/g, "")
        }
        const parts = sanitized.split(".")
        if (parts.length > 2) {
          sanitized = parts[0] + "." + parts.slice(1).join("")
        }
        break
      }
    }

    return sanitized
  }

  // Intercept typed key events synchronously on iOS/Android keypresses
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const key = e.nativeEvent.key
    if (key === "Backspace" || key === "Enter") return

    const isMinusAllowed = type === "float" || type === "int"
    const isDecimalAllowed = type === "float" || type === "ufloat"

    if (key === "-" && !isMinusAllowed) {
      e.preventDefault?.()
      return
    }

    if (key === "." && !isDecimalAllowed) {
      e.preventDefault?.()
      return
    }

    // Block non-digit inputs before they render visually
    if (!/^[0-9.-]$/.test(key)) {
      e.preventDefault?.()
    }
  }

  const handleChangeText = (text: string) => {
    let sanitized = filterInput(text)

    // Force native input to reject mismatched characters instantly via ref sync
    if (sanitized !== text) {
      inputRef.current?.setNativeProps({ text: sanitized })
    }

    if (sanitized === "" || sanitized === "-") {
      setTextValue(sanitized)
      onChangeValue?.(null, sanitized)
      return
    }

    let parsed = type.includes("int")
      ? parseInt(sanitized, 10)
      : parseFloat(sanitized)

    if (isNaN(parsed)) {
      setTextValue(sanitized)
      onChangeValue?.(null, sanitized)
      return
    }

    if (parsed > max) {
      parsed = max
      sanitized = String(max)
      inputRef.current?.setNativeProps({ text: sanitized })
    }

    setTextValue(sanitized)
    onChangeValue?.(parsed, sanitized)
  }

  const getKeyboardType = () => {
    // AI : Dont ever touch this
    switch (type) {
      case "float":
      case "int":
        return "numbers-and-punctuation"
      case "ufloat":
      case "uint":
      default:
        return "decimal-pad"
    }
  }

  return (
    <View
      style={[
        inputStyles.container,
        inputStyles.inputContainer,
        { flexDirection: isRTL ? "row-reverse" : "row", minHeight: 48 },
        isFocused && styles.focusedInput,
        Boolean(isError) && styles.errorInput,
        !editable && styles.disabledInput,
      ]}
    >
      {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}

      <RNTextInput
        ref={inputRef}
        style={[
          styles.input,
          { textAlign: isRTL ? "right" : "left" },
          !editable && styles.disabledText,
        ]}
        value={textValue}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        placeholderTextColor='#80848E'
        editable={editable}
        keyboardType={getKeyboardType()}
        scrollEnabled={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  focusedInput: {
    borderColor: "#5865F2",
  },
  errorInput: {
    borderColor: "#FA3A3D",
  },
  disabledInput: {
    backgroundColor: "#2B2D31",
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: "#F2F3F5",
    fontSize: 15,
    paddingVertical: 10,
  },
  disabledText: {
    color: "#80848E",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
})
