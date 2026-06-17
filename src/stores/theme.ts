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

const initialState: IProperties = {
  theme: "ocean",
  accentName: "yellow",
  isDark: palettes.ocean.isDark,
  colors: {
    accent: accents.yellow.dark,
    ...palettes.ocean.colors,
  },
}

interface IMethods {
  onThemeChange: (theme: ITheme) => void
  onAccentChange: (accentName: IAccentColor) => void
}

export const useTheme = create<IProperties & IMethods>((set, get) => ({
  ...initialState,

  onThemeChange: (theme) => {
    const currentAccentName = get().accentName
    const themePalette = palettes[theme]
    const accentPalette = accents[currentAccentName]

    set({
      theme,
      isDark: themePalette.isDark,
      colors: {
        accent: themePalette.isDark ? accentPalette.dark : accentPalette.light,
        ...themePalette.colors,
      },
    })
  },

  onAccentChange: (accentName) => {
    const currentTheme = get().theme
    const themePalette = palettes[currentTheme]
    const accentPalette = accents[accentName]

    set({
      accentName,
      colors: {
        accent: themePalette.isDark ? accentPalette.dark : accentPalette.light,
        ...themePalette.colors,
      },
    })
  },
}))
