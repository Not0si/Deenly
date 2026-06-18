import { IFontFamily, ITypography, typographies } from "@/constants/typography"
import { ILocale, L10nMessages } from "@/l10n"
import { create } from "zustand"

type TranslateParams = Record<string, string | number>

type IState = {
  locale: ILocale
  dir: "rtl" | "ltr"
  fontFamily: IFontFamily
  typography: ITypography
  setLocale: (locale: ILocale) => void
  translate: (key: string, params?: TranslateParams) => string
}

export const useLocale = create<IState>((set, get) => ({
  locale: "en",
  dir: "ltr",
  fontFamily: "Cabin",
  typography: typographies.Cabin,

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

    let text =
      (L10nMessages[locale] as any)[key] ??
      (L10nMessages.en as any)[key] ??
      String(key)

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
