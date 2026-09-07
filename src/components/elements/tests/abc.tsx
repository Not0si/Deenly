import { WheelPicker } from "@/components/ui/wheel-picker"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function MultiColumnTimer() {
  const [hours, setHours] = useState("00")
  const [minutes, setMinutes] = useState("15")
  const [seconds, setSeconds] = useState("30")

  const hoursData = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  )
  const minutesData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  )
  const secondsData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Timer: {hours}:{minutes}:{seconds}
      </Text>

      {/* Row layout holding all three pickers */}
      <View style={styles.pickerRow}>
        <View style={styles.columnContainer}>
          <WheelPicker
            data={hoursData}
            initialIndex={0}
            onValueChange={(val) => setHours(val)}
          />
          <Text style={styles.label}>h</Text>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.columnContainer}>
          <WheelPicker
            data={minutesData}
            initialIndex={15}
            onValueChange={(val) => setMinutes(val)}
          />
          <Text style={styles.label}>m</Text>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.columnContainer}>
          <WheelPicker
            data={secondsData}
            initialIndex={30}
            onValueChange={(val) => setSeconds(val)}
          />
          <Text style={styles.label}>s</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#888",
    fontSize: 16,
    marginLeft: 4,
    marginRight: 8,
  },
  separator: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
})
