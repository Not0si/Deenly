import React, { useRef } from "react"
import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from "react-native"

const ITEM_HEIGHT = 50
const VISIBLE_ITEMS = 5

interface IProps {
  data: string[]
  initialIndex?: number
  onValueChange: (value: string, index: number) => void
}

export function WheelPicker({ data, initialIndex = 0, onValueChange }: IProps) {
  const scrollY = useRef(new Animated.Value(0)).current

  // Add empty items at start/end so selection aligns in center
  const paddedData = ["", "", ...data, "", ""]

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y
    const index = Math.round(offsetY / ITEM_HEIGHT)
    if (data[index] !== undefined) {
      onValueChange(data[index], index)
    }
  }

  return (
    <View style={[styles.container, { height: ITEM_HEIGHT * VISIBLE_ITEMS }]}>
      {/* Selection highlight box */}
      <View style={styles.selectionOverlay} />

      <Animated.FlatList
        data={paddedData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        scrollEventThrottle={16}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => {
          if (!item) return <View style={{ height: ITEM_HEIGHT }} />

          // Calculate opacity and scaling based on scroll distance
          const itemOffset = (index - 2) * ITEM_HEIGHT
          const opacity = scrollY.interpolate({
            inputRange: [
              itemOffset - ITEM_HEIGHT * 2,
              itemOffset - ITEM_HEIGHT,
              itemOffset,
              itemOffset + ITEM_HEIGHT,
              itemOffset + ITEM_HEIGHT * 2,
            ],
            outputRange: [0.2, 0.5, 1, 0.5, 0.2],
            extrapolate: "clamp",
          })

          return (
            <Animated.View style={[styles.item, { opacity }]}>
              <Text style={styles.itemText}>{item}</Text>
            </Animated.View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    overflow: "hidden",
  },
  selectionOverlay: {
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
})
