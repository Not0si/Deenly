import { StyleSheet } from "react-native";

import { Div } from "@/components/ui/div";
import { Message } from "@/components/ui/message";

export default function TabTwoScreen() {
  return (
    <Div>
      <Message>adsa</Message>
    </Div>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
