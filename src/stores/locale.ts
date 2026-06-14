import { ILocale, L10nMessages } from "@/l10n";
import { create } from "zustand";

type TranslateParams = Record<string, string | number>;

type IState = {
  locale: ILocale;
  dir: "rtl" | "ltr";
  setLocale: (locale: ILocale) => void;
  translate: (
    key: keyof (typeof L10nMessages)["en"],
    params?: TranslateParams,
  ) => string;
};

export const useLocale = create<IState>((set, get) => ({
  locale: "en",
  dir: "ltr",

  setLocale: (locale) => {
    set({ locale, dir: locale === "ar" ? "rtl" : "ltr" });
  },

  translate: (key, params) => {
    const locale = get().locale;

    let text = L10nMessages[locale][key] ?? L10nMessages.en[key] ?? String(key);

    if (!params) return text;

    // replace {placeholders}
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    });

    return text;
  },
}));

// JSON
// {
//   "welcome_user": "Welcome {name}",
//   "items_count": "You have {count} items"
// }

// React
// const t = useLocale((s) => s.translate);

// t("welcome_user", { name: "Ali" });

// t("items_count", { count: 5 });
