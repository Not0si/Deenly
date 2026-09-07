import { StyleSheet } from "react-native"

export function useInputStyle() {
  const inputStyles = StyleSheet.create({
    container: {
      width: "100%",
      height: 48,
    },
    inputContainer: {
      backgroundColor: "#1E1F22",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "transparent",
      paddingHorizontal: 12,
      alignItems: "center",
      overflow: "hidden",
    },
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
    largeInput: {
      textAlignVertical: "top",
    },
    disabledText: {
      color: "#80848E",
    },
    iconWrapper: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 4,
    },
    topAlignIcon: {
      alignSelf: "flex-start",
      paddingTop: 12,
    },
    helperText: {
      fontSize: 12,
      color: "#949BA4",
      marginTop: 6,
    },
    errorText: {
      color: "#FA3A3D",
    },
  })

  return { inputStyles }
}
