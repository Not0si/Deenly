import { useTheme } from "@/stores/theme";
import { StyleSheet, Text, type TextProps } from "react-native";

export type IProps = TextProps & {
  type?: "default" | "h1" | "h2" | "h3" | "h4" | "p" | "link";
};

// fontFamily: "Nunito" , "Cairo"

export function Message({ style, type = "default", ...rest }: IProps) {
  const colors = useTheme((s) => s.colors);

  return (
    <Text
      style={[
        { color: colors.fg, fontFamily: "Nunito" },
        type === "default" ? styles.default : undefined,
        type === "h1" ? styles.title : undefined,
        type === "h2" ? styles.defaultSemiBold : undefined,
        type === "h3" ? styles.subtitle : undefined,
        type === "h4" ? styles.subtitle : undefined,
        type === "p" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
