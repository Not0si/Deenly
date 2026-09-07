import { useTheme } from "@/stores/theme"
import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

export interface SecondOnlyClockRef {
  start: () => void
  stop: () => void
  toggle: () => void
  reset: () => void
  isRunning: () => boolean
}

interface SecondOnlyClockProps {
  clockSize?: number
  initialRunningState?: boolean
  ref?: React.Ref<SecondOnlyClockRef>
}

export const SecondOnlyClock: React.FC<SecondOnlyClockProps> = ({
  clockSize = 280,
  initialRunningState = true,
  ref,
}) => {
  const colors = useTheme((state) => state.colors)
  const [isRunning, setIsRunning] = useState<boolean>(initialRunningState)
  const rotation: SharedValue<number> = useSharedValue(0)

  const pausedTimeRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  const innerCircleSize = clockSize * 0.75
  const innerRadius = innerCircleSize / 2

  useImperativeHandle(ref, () => ({
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    toggle: () => setIsRunning((prev) => !prev),
    reset: () => {
      setIsRunning(false)
      pausedTimeRef.current = 0
      rotation.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.quad),
      })
    },
    isRunning: () => isRunning,
  }))

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      startTimeRef.current = Date.now() - pausedTimeRef.current

      interval = setInterval(() => {
        const elapsedMs = Date.now() - startTimeRef.current
        pausedTimeRef.current = elapsedMs

        const totalDegrees = (elapsedMs / 1000) * 6

        rotation.value = withTiming(totalDegrees % 360, {
          duration: 100,
          easing: Easing.linear,
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, rotation])

  const animatedHandStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const renderTicks = (): React.ReactNode[] => {
    return Array.from({ length: 60 }).map((_, index) => {
      const isMajor = index % 5 === 0
      const angle = index * 6
      return (
        <View
          key={`tick-${index}`}
          style={[
            styles.tick,
            isMajor
              ? [styles.majorTick, { backgroundColor: colors.text_normal }]
              : [styles.minorTick, { backgroundColor: colors.icon_muted }],
            {
              transform: [
                { rotate: `${angle}deg` },
                { translateY: -clockSize / 2 + 10 },
              ],
            },
          ]}
        />
      )
    })
  }

  const renderInnerLabels = (): React.ReactNode[] => {
    return Array.from({ length: 12 }).map((_, index) => {
      const value = (index + 1) * 5
      const angleDeg = index * 30 - 60
      const angleRad = (angleDeg * Math.PI) / 180

      const labelRadius = innerRadius - 18
      const x = labelRadius * Math.cos(angleRad)
      const y = labelRadius * Math.sin(angleRad)

      return (
        <View
          key={`label-${value}`}
          style={[
            styles.labelContainer,
            {
              transform: [{ translateX: x }, { translateY: y }],
            },
          ]}
        >
          <Text style={[styles.labelText, { color: colors.text_muted }]}>
            {value}
          </Text>
        </View>
      )
    })
  }

  return (
    <View
      style={[
        styles.clockFace,
        {
          width: clockSize,
          height: clockSize,
          borderRadius: clockSize / 2,
          backgroundColor: colors.bg_secondary,
          borderColor: colors.bg_tertiary,
        },
      ]}
    >
      {renderTicks()}

      <View
        style={[
          styles.innerCircle,
          {
            width: innerCircleSize,
            height: innerCircleSize,
            borderRadius: innerCircleSize / 2,
            backgroundColor: colors.bg_tertiary,
            borderColor: colors.input_outer,
          },
        ]}
      >
        {renderInnerLabels()}
      </View>

      <Animated.View
        style={[
          styles.handContainer,
          { width: clockSize, height: clockSize },
          animatedHandStyle,
        ]}
      >
        <View
          style={[
            styles.secondHand,
            {
              height: clockSize / 2 - 12,
              backgroundColor: colors.accent,
            },
          ]}
        />
      </Animated.View>

      <View
        style={[
          styles.centerCap,
          {
            backgroundColor: colors.accent,
            borderColor: colors.surface_floating,
          },
        ]}
      />
    </View>
  )
}

interface Styles {
  clockFace: ViewStyle
  tick: ViewStyle
  minorTick: ViewStyle
  majorTick: ViewStyle
  innerCircle: ViewStyle
  labelContainer: ViewStyle
  labelText: TextStyle
  handContainer: ViewStyle
  secondHand: ViewStyle
  centerCap: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  clockFace: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tick: {
    position: "absolute",
    borderRadius: 1,
  },
  minorTick: {
    width: 2,
    height: 6,
  },
  majorTick: {
    width: 3,
    height: 10,
  },
  innerCircle: {
    position: "absolute",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    position: "absolute",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "600",
  },
  handContainer: {
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  secondHand: {
    width: 2.5,
    marginTop: 12,
    borderRadius: 1.5,
  },
  centerCap: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
})
