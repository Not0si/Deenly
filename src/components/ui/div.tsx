import { useTheme } from "@/stores/theme";
import { View, type ViewProps } from "react-native";
import { withErrorBoundary } from "./error-boundary";

export type IProps = ViewProps;

function Comp({ style, ...otherProps }: IProps) {
  const colors = useTheme((s) => s.colors);

  return (
    <View style={[{ backgroundColor: colors.bg }, style]} {...otherProps} />
  );
}

export const Div = withErrorBoundary(Comp);
