import { useLocale } from "@/stores/locale"
import { useTheme } from "@/stores/theme"
import { Text, type TextProps } from "react-native"
import { withErrorBoundary } from "./error-boundary"

export type IProps = TextProps & {
  type?: "default" | "h1" | "h2" | "h3" | "caption"
}

function Comp({ style, type = "default", ...rest }: IProps) {
  const colors = useTheme((s) => s.colors)
  const fontFamily = useLocale((s) => s.fontFamily)
  const typography = useLocale((s) => s.typography)
  const dir = useLocale((s) => s.dir)

  return (
    <Text
      style={[
        { color: colors.fg, fontFamily: fontFamily, direction: dir },
        type === "default" ? typography.bodySmall : undefined,
        type === "h1" ? typography.h1 : undefined,
        type === "h2" ? typography.h2 : undefined,
        type === "h3" ? typography.h3 : undefined,
        type === "caption" ? typography.caption : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

export const Message = withErrorBoundary(Comp)
