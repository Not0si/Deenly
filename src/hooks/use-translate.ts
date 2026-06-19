import { L10nMessages } from "@/l10n"
import { useLocale } from "@/stores/locale"

export const useTranslate = () => {
  const locale = useLocale((s) => s.locale)

  return (key: string, params?: Record<string, string | number>): string => {
    let text =
      (L10nMessages[locale] as any)[key] ?? (L10nMessages.en as any)[key] ?? key

    if (!params) return text

    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v))
    })

    return text
  }
}

// JSON
// {
//   "welcome_user": "Welcome {name}",
//   "items_count": "You have {count} items"
// }

// React
// const translate = useTranslate( );

// translate("welcome_user", { name: "Ali" });

// translate("items_count", { count: 5 });
