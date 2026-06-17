import ar from "./translations/ar.json"
import en from "./translations/en.json"
import fr from "./translations/fr.json"

export const L10nMessages = {
  ar,
  en,
  fr,
} as const

export type ILocale = keyof typeof L10nMessages
