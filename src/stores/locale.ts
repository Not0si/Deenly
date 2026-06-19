import { IFontFamily, ITypography, typographies } from "@/constants/typography"
import { ILocale } from "@/l10n"
import { create } from "zustand"

type IState = {
  locale: ILocale
  dir: "rtl" | "ltr"
  fontFamily: IFontFamily
  typography: ITypography
  setLocale: (locale: ILocale) => void
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
}))
