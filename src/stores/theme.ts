import { create } from 'zustand';

// #region asd 

interface IPalette {
    accent: string

    bg: string;
    bg_canvas: string;
    bg_surface: string;
    bg_surfaceAlt: string;
    bg_surfaceMuted: string;

    fg: string

    success: string;
    warning: string;
    error: string;
    info: string;
}

type ITheme = 'ocean' | 'light' | 'sunset' | 'forest'

const palettes: Record<
    ITheme,
    { isDark: boolean; colors: IPalette }
> = {
    light: {
        isDark: false,
        colors: {
            accent: '#ffb703',

            bg: "#F8FAFC",
            bg_canvas: "#F8FAFC",        // app background
            bg_surface: "#FFFFFF",       // main cards
            bg_surfaceAlt: "#F1F5F9",    // slightly elevated sections
            bg_surfaceMuted: "#E2E8F0",  // dividers / subtle blocks

            fg: '#023047',

            success: "#16A34A",
            warning: "#D97706",
            error: "#DC2626",
            info: "#2563EB",
        },
    },

    ocean: {
        isDark: true,
        colors: {
            accent: '#ffb703',

            bg: "#1C1C23",
            bg_canvas: "#2C2D34",
            bg_surface: "#323339",
            bg_surfaceAlt: "#373A43",
            bg_surfaceMuted: "#27272F",

            fg: '#fafafa',

            success: "#22C55E",
            warning: "#F59E0B",
            error: "#EF4444",
            info: "#3B82F6",
        },
    },

    forest: {
        isDark: true,
        colors: {
            accent: '#ffb703',

            bg: "#0B1410",
            bg_canvas: "#0B1410",
            bg_surface: "#122018",
            bg_surfaceAlt: "#1A2B20",
            bg_surfaceMuted: "#223A2C",

            fg: '#fafafa',

            success: "#22C55E",
            warning: "#EAB308",
            error: "#EF4444",
            info: "#38BDF8",
        },
    },

    sunset: {
        isDark: false,
        colors: {
            accent: '#ffb703',

            bg: "#FFF7ED",
            bg_canvas: "#FFF7ED",
            bg_surface: "#FFFFFF",
            bg_surfaceAlt: "#FFEDD5",
            bg_surfaceMuted: "#FED7AA",

            fg: '#2e2e2e',

            success: "#16A34A",
            warning: "#F59E0B",
            error: "#DC2626",
            info: "#EA580C",
        },
    },
} as const;

// #endregion 

// #region das

interface IProperties {
    theme: ITheme
    isDark: boolean
    colors: IPalette
}

const initialState: IProperties = {
    theme: "ocean",
    isDark: palettes.ocean.isDark,
    colors: palettes.ocean.colors
}

interface IMethods {
    onThemeChange: (theme: ITheme) => void
}

export const useTheme = create<IProperties & IMethods>((set) => ({
    ...initialState,

    onThemeChange: (theme) => {
        const pickedPalette = palettes[theme]

        set({
            theme,
            isDark: pickedPalette.isDark,
            colors: pickedPalette.colors
        })
    }
}))

// #endregion 