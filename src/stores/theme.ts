import {
  accents,
  IAccentColor,
  IPalette,
  ITheme,
  palettes,
} from "@/constants/theme"
import { create } from "zustand"

interface IProperties {
  theme: ITheme
  accentName: IAccentColor
  isDark: boolean
  colors: IPalette
}

interface IMethods {
  onThemeChange: (theme: ITheme) => void
  onAccentChange: (accentName: IAccentColor) => void
}

const DEFAULT_THEME: ITheme = "ocean"
const DEFAULT_ACCENT: IAccentColor = "green"

const getPaletteColors = (
  theme: ITheme,
  accentName: IAccentColor
): IPalette => {
  const themePalette = palettes[theme]
  const accentPalette = accents[accentName]

  return {
    accent: themePalette.isDark ? accentPalette.dark : accentPalette.light,
    ...themePalette.colors,
  }
}

const initialState: IProperties = {
  theme: DEFAULT_THEME,
  accentName: DEFAULT_ACCENT,
  isDark: palettes[DEFAULT_THEME].isDark,
  colors: getPaletteColors(DEFAULT_THEME, DEFAULT_ACCENT),
}

export const useTheme = create<IProperties & IMethods>((set, get) => ({
  ...initialState,

  onThemeChange: (theme) => {
    const currentAccentName = get().accentName
    set({
      theme,
      isDark: palettes[theme].isDark,
      colors: getPaletteColors(theme, currentAccentName),
    })
  },

  onAccentChange: (accentName) => {
    const currentTheme = get().theme
    set({
      accentName,
      colors: getPaletteColors(currentTheme, accentName),
    })
  },
}))
