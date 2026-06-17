import { ILocale } from "@/l10n"

interface IDetail {
  nativeName: string
  dir: "rtl" | "ltr"
  trCode: string
  localeCode: ILocale
}

export const locales: Record<ILocale, IDetail> = {
  en: {
    nativeName: "English",
    dir: "ltr",
    trCode: "1",
    localeCode: "en",
  },
  fr: { nativeName: "Français", dir: "ltr", trCode: "1", localeCode: "fr" },
  ar: { nativeName: "العربية", dir: "rtl", trCode: "1", localeCode: "ar" },
}
