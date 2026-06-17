import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { useLocale } from "@/stores/locale"
import { useTheme } from "@/stores/theme"

import { Home2Outlined } from "@lineiconshq/free-icons"
import { Lineicons } from "@lineiconshq/react-native-lineicons"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

export function TabBarCustom({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colors = useTheme((s) => s.colors)
  const dir = useLocale((s) => s.dir)

  const [containerWidth, setContainerWidth] = useState(0)

  const indicatorX = useRef(new Animated.Value(0)).current

  const tabWidth =
    containerWidth > 0
      ? (containerWidth - styles.container.paddingHorizontal * 2) /
        state.routes.length
      : 0

  useEffect(() => {
    if (!tabWidth) return

    Animated.spring(indicatorX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      damping: 15,
      stiffness: 180,
      mass: 0.8,
    }).start()
  }, [state.index, tabWidth])

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg_canvas,
          flexDirection: dir === "ltr" ? "row" : "row-reverse",
        },
      ]}
    >
      {tabWidth > 0 && (
        <Animated.View
          pointerEvents='none'
          style={{
            position: "absolute",
            left: styles.container.paddingHorizontal,
            width: tabWidth,
            height: 40,
            borderRadius: 42,
            backgroundColor: colors.bg_surface,
            transform: [{ translateX: indicatorX }],
          }}
        />
      )}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label = (options.tabBarLabel ??
          options.title ??
          route.name) as string

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TabButton
            key={route.key}
            label={label}
            routeName={route.name}
            isFocused={isFocused}
            dir={dir}
            onPress={onPress}
            onLongPress={onLongPress}
            testID={options.tabBarButtonTestID}
          />
        )
      })}
    </View>
  )
}

function TabButton({
  label,
  routeName,
  isFocused,
  dir,
  onPress,
  onLongPress,
  testID,
}: {
  label: string
  routeName: string
  isFocused: boolean
  dir: "ltr" | "rtl"
  onPress: () => void
  onLongPress: () => void
  testID?: string
}) {
  const opacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isFocused ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start()
  }, [isFocused])

  return (
    <TouchableOpacity
      accessibilityRole='button'
      accessibilityState={isFocused ? { selected: true } : {}}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={[
        styles.tab,
        {
          flexDirection: dir === "ltr" ? "row" : "row-reverse",
        },
      ]}
    >
      <RoutIcon name={routeName} isFocused={isFocused} />

      <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateX: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-8, 0],
              }),
            },
          ],
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

function RoutIcon({ name, isFocused }: { name: string; isFocused: boolean }) {
  const colors = useTheme((s) => s.colors)

  const props = {
    size: 28,
    color: isFocused ? colors.accent : colors.icon,
    strokeWidth: 2,
  }

  switch (name) {
    case "index":
      return <Lineicons icon={Home2Outlined} {...props} />

    case "salat":
      return <Lineicons icon={Home2Outlined} {...props} />

    case "explor":
      return <Lineicons icon={Home2Outlined} {...props} />

    default:
      return <Lineicons icon={Home2Outlined} {...props} />
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",

    width: "90%",
    height: 60,

    paddingHorizontal: 12,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },

  tab: {
    flex: 1,
    height: 40,

    borderRadius: 42,

    alignItems: "center",
    justifyContent: "center",

    gap: 6,
    zIndex: 2,
  },
})
