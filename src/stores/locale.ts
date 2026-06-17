import { ILocale, L10nMessages } from "@/l10n"
import { TextStyle } from "react-native"
import { create } from "zustand"

type ITypography = {
  display: TextStyle
  h1: TextStyle
  h2: TextStyle
  h3: TextStyle
  title: TextStyle
  body: TextStyle
  bodySmall: TextStyle
  caption: TextStyle
  button: TextStyle
}
type IFontFamily = "Nunito" | "Cairo" | "Cabin"

const typographies: Record<IFontFamily, ITypography> = {
  Nunito: {
    display: {
      fontFamily: "Nunito",
      fontWeight: "800",
      fontSize: 36,
      lineHeight: 44,
    },
    h1: {
      fontFamily: "Nunito",
      fontWeight: "700",
      fontSize: 32,
      lineHeight: 40,
    },
    h2: {
      fontFamily: "Nunito",
      fontWeight: "700",
      fontSize: 28,
      lineHeight: 36,
    },
    h3: {
      fontFamily: "Nunito",
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 32,
    },
    title: {
      fontFamily: "Nunito",
      fontWeight: "600",
      fontSize: 20,
      lineHeight: 28,
    },
    body: {
      fontFamily: "Nunito",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: "Nunito",
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "Nunito",
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 16,
    },
    button: {
      fontFamily: "Nunito",
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 20,
    },
  },

  Cairo: {
    display: {
      fontFamily: "Cairo",
      fontWeight: "800",
      fontSize: 36,
      lineHeight: 48,
    },
    h1: {
      fontFamily: "Cairo",
      fontWeight: "700",
      fontSize: 32,
      lineHeight: 44,
    },
    h2: {
      fontFamily: "Cairo",
      fontWeight: "700",
      fontSize: 28,
      lineHeight: 40,
    },
    h3: {
      fontFamily: "Cairo",
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 36,
    },
    title: {
      fontFamily: "Cairo",
      fontWeight: "600",
      fontSize: 20,
      lineHeight: 32,
    },
    body: {
      fontFamily: "Cairo",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 28,
    },
    bodySmall: {
      fontFamily: "Cairo",
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 24,
    },
    caption: {
      fontFamily: "Cairo",
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 20,
    },
    button: {
      fontFamily: "Cairo",
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 24,
    },
  },

  Cabin: {
    display: {
      fontFamily: "Cabin",
      fontWeight: "700",
      fontSize: 36,
      lineHeight: 44,
    },
    h1: {
      fontFamily: "Cabin",
      fontWeight: "700",
      fontSize: 32,
      lineHeight: 40,
    },
    h2: {
      fontFamily: "Cabin",
      fontWeight: "700",
      fontSize: 28,
      lineHeight: 36,
    },
    h3: {
      fontFamily: "Cabin",
      fontWeight: "600",
      fontSize: 24,
      lineHeight: 32,
    },
    title: {
      fontFamily: "Cabin",
      fontWeight: "600",
      fontSize: 20,
      lineHeight: 28,
    },
    body: {
      fontFamily: "Cabin",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: "Cabin",
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "Cabin",
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 16,
    },
    button: {
      fontFamily: "Cabin",
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 20,
    },
  },
} as const

type TranslateParams = Record<string, string | number>

type IState = {
  locale: ILocale
  dir: "rtl" | "ltr"
  fontFamily: IFontFamily
  typography: ITypography
  setLocale: (locale: ILocale) => void
  translate: (
    key: keyof (typeof L10nMessages)["en"],
    params?: TranslateParams
  ) => string
}

export const useLocale = create<IState>((set, get) => ({
  locale: "en",
  dir: "ltr",
  fontFamily: "Nunito",
  typography: typographies.Nunito,

  setLocale: (locale) => {
    const isArabic = locale === "ar"

    set({
      locale,
      dir: isArabic ? "rtl" : "ltr",
      fontFamily: isArabic ? "Cairo" : "Cabin",
      typography: isArabic ? typographies.Cairo : typographies.Cabin,
    })
  },

  translate: (key, params) => {
    const locale = get().locale

    let text = L10nMessages[locale][key] ?? L10nMessages.en[key] ?? String(key)

    if (!params) return text

    // replace {placeholders}
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v))
    })

    return text
  },
}))

// JSON
// {
//   "welcome_user": "Welcome {name}",
//   "items_count": "You have {count} items"
// }

// React
// const t = useLocale((s) => s.translate);

// translate("welcome_user", { name: "Ali" });

// translate("items_count", { count: 5 });
