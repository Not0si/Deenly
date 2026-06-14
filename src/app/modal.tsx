import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { Div } from "@/components/ui/div";
import { Message } from "@/components/ui/message";

export default function ModalScreen() {
  return (
    <Div style={styles.container}>
      <Message>This is a modal</Message>
      <Link href="/" dismissTo style={styles.link}>
        <Message type="link">Go to home screen</Message>
      </Link>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
