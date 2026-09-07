import { useTheme } from "@/stores/theme"
import { IconData } from "@lineiconshq/free-icons"
import { Lineicons } from "@lineiconshq/react-native-lineicons"
import { FC } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ButtonPrimaryProps {
  label: string
  onPress: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  label,
  onPress,
  icon,
  disabled = false,
}) => {
  const colors = useTheme((state) => state.colors)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        { backgroundColor: colors.accent },
        disabled && styles.disabled,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.primaryText, { color: colors.text_heading }]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

interface ButtonSecondaryProps {
  label: string
  onPress: () => void
}

export const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  label,
  onPress,
}) => {
  const colors = useTheme((state) => state.colors)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.base, { backgroundColor: colors.input_outer }]}
    >
      <Text style={[styles.secondaryText, { color: colors.text_normal }]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

interface ButtonDestructiveProps {
  label: string
  onPress: () => void
}

export const ButtonDestructive: FC<ButtonDestructiveProps> = ({
  label,
  onPress,
}) => {
  const colors = useTheme((state) => state.colors)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.base, { backgroundColor: colors.status_red }]}
    >
      <Text style={[styles.destructiveText, { color: colors.text_heading }]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

interface ButtonIconProps {
  icon: IconData
  onPress: () => void
  active?: boolean
  size?: number
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  onPress,
  active = false,
  size = 40,
}) => {
  const colors = useTheme((state) => state.colors)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.iconBase,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: active ? colors.input_outer : colors.bg_secondary,
        },
      ]}
    >
      <Lineicons
        icon={icon}
        size={Math.max(10, size - 14)}
        color={colors.icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  destructiveText: {
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
  iconBase: {
    justifyContent: "center",
    alignItems: "center",
  },
})
