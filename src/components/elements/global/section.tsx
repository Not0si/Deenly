import { useTheme } from "@/stores/theme"
import React from "react"
import { StyleSheet, Text, View, ViewProps } from "react-native"

interface SectionProps extends ViewProps {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  variant?: "primary" | "secondary" | "floating"
  padding?: "none" | "small" | "medium" | "large"
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  action,
  variant = "primary",
  padding = "medium",
  children,
  style,
  ...props
}) => {
  const colors = useTheme((state) => state.colors)

  const variantStyles = {
    primary: {
      backgroundColor: colors.bg_primary,
    },
    secondary: {
      backgroundColor: colors.bg_secondary,
      borderWidth: 1,
      borderColor: colors.bg_tertiary,
    },
    floating: {
      backgroundColor: colors.bg_tertiary,
      borderWidth: 1,
      borderColor: colors.border,
    },
  }[variant]

  return (
    <View
      style={[styles.base, variantStyles, styles[`padding_${padding}`], style]}
      {...props}
    >
      {(title || action) && (
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {title && (
              <Text style={[styles.title, { color: colors.text_heading }]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.text_muted }]}>
                {subtitle}
              </Text>
            )}
          </View>
          {action && <View style={styles.actionContainer}>{action}</View>}
        </View>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    width: "100%",
    marginVertical: 6,
  },

  // Padding Scales
  padding_none: {
    padding: 0,
  },
  padding_small: {
    padding: 8,
  },
  padding_medium: {
    padding: 16,
  },
  padding_large: {
    padding: 24,
  },

  // Header Typography
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2,
  },
  actionContainer: {
    alignItems: "flex-end",
  },
})
