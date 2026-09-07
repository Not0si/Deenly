// #region Palettes

export interface IPalette {
  accent: string

  bg_primary: string
  bg_secondary: string
  bg_tertiary: string
  surface_floating: string
  input_outer: string

  text_normal: string
  text_muted: string
  text_heading: string
  text_link: string

  border: string

  icon: string
  icon_muted: string

  status_green: string
  status_yellow: string
  status_red: string
  status_offline: string
}

export type ITheme = "ocean" | "light" | "sunset" | "forest"

export const palettes: Record<
  ITheme,
  { isDark: boolean; colors: Omit<IPalette, "accent"> }
> = {
  ocean: {
    isDark: true,
    colors: {
      bg_primary: "#313338",
      bg_secondary: "#2B2D31",
      bg_tertiary: "#1E1F22",
      surface_floating: "#111214",
      input_outer: "#383A40",

      text_normal: "#DBDEE1",
      text_muted: "#949BA4",
      text_heading: "#F2F3F5",
      text_link: "#00A8FC",

      border: "#3F4147",

      icon: "#B5BAC1",
      icon_muted: "#80848E",

      status_green: "#23A55A",
      status_yellow: "#F0B232",
      status_red: "#F23F43",
      status_offline: "#80848E",
    },
  },

  light: {
    isDark: false,
    colors: {
      bg_primary: "#FFFFFF",
      bg_secondary: "#F2F3F5",
      bg_tertiary: "#E3E5E8",
      surface_floating: "#FFFFFF",
      input_outer: "#EBEDF0",

      text_normal: "#313338",
      text_muted: "#5C5E66",
      text_heading: "#060607",
      text_link: "#006CE5",

      border: "#E3E5E8",

      icon: "#4E5058",
      icon_muted: "#80848E",

      status_green: "#23A55A",
      status_yellow: "#F0B232",
      status_red: "#F23F43",
      status_offline: "#80848E",
    },
  },

  forest: {
    isDark: true,
    colors: {
      bg_primary: "#1A2420",
      bg_secondary: "#141C19",
      bg_tertiary: "#0E1411",
      surface_floating: "#0A0F0D",
      input_outer: "#24302B",

      text_normal: "#E1E7E4",
      text_muted: "#8A9A92",
      text_heading: "#F0F4F2",
      text_link: "#22D3EE",

      border: "#293832",

      icon: "#A3B5AC",
      icon_muted: "#63736B",

      status_green: "#23A55A",
      status_yellow: "#F0B232",
      status_red: "#F23F43",
      status_offline: "#63736B",
    },
  },

  sunset: {
    isDark: false,
    colors: {
      bg_primary: "#FFFFFF",
      bg_secondary: "#FFF7ED",
      bg_tertiary: "#FFEDD5",
      surface_floating: "#FFFFFF",
      input_outer: "#FED7AA",

      text_normal: "#431407",
      text_muted: "#9A3412",
      text_heading: "#2A0A03",
      text_link: "#C2410C",

      border: "#FFEDD5",

      icon: "#9A3412",
      icon_muted: "#C2410C",

      status_green: "#23A55A",
      status_yellow: "#F0B232",
      status_red: "#F23F43",
      status_offline: "#9A3412",
    },
  },
} as const

// #endregion

// #region Accents

export const accents = {
  blurple: {
    light: "#5865F2",
    dark: "#5865F2",
  },
  red: {
    light: "#DA373C",
    dark: "#F23F43",
  },
  pink: {
    light: "#E13570",
    dark: "#EB459E",
  },
  purple: {
    light: "#7B2CBF",
    dark: "#9D4EDD",
  },
  green: {
    light: "#23A55A",
    dark: "#23A55A",
  },
  yellow: {
    light: "#D97706",
    dark: "#F0B232",
  },
  orange: {
    light: "#E65100",
    dark: "#F97316",
  },
} as const

export type IAccentColor = keyof typeof accents

// #endregion
