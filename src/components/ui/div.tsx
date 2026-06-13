import { useTheme } from '@/stores/theme';
import { View, type ViewProps } from 'react-native';


export type IProps = ViewProps

export function Div({ style, ...otherProps }: IProps) {
    const colors = useTheme(s => s.colors)

    return <View style={[{ backgroundColor: colors.bg }, style]} {...otherProps} />;
}
