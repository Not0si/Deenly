export const calendarMethod = {
  HJCoSA: {
    value: "HJCoSA",
    description:
      "High Judicial Council of Saudi Arabia (this is used on aladhan.com)",
  },
  UAQ: {
    value: "UAQ",
    description: "Umm al-Qura",
  },
  DIYANET: {
    value: "DIYANET",
    description: "Diyanet İşleri Başkanlığı",
  },
  MATHEMATICAL: {
    value: "MATHEMATICAL",
    description: "",
  },
} as const

export type ICalendarMethod =
  (typeof calendarMethod)[keyof typeof calendarMethod]["value"]

//========================================
//
//
//========================================

export const latitudeAdjustmentMethod = {
  MiddleOfTheNight: {
    value: 1,
    description: "Middle of the Night",
  },
  OneSeventh: {
    value: 2,
    description: "One Seventh",
  },
  AngleBased: {
    value: 3,
    description: "Angle Based",
  },
} as const

export type ILatitudeAdjustmentMethod =
  (typeof latitudeAdjustmentMethod)[keyof typeof latitudeAdjustmentMethod]["value"]

//========================================
//
//
//========================================

export const midnightMode = {
  Standard: {
    value: 0,
    description: "Mid Sunset to Sunrise",
  },
  Jafari: {
    value: 1,
    description: "Mid Sunset to Fajr",
  },
} as const

export type IMidnightMode =
  (typeof midnightMode)[keyof typeof midnightMode]["value"]

//========================================
//
//
//========================================

export const school = {
  Shafi: {
    value: 0,
    description: "Shafi",
  },
  Hanafi: {
    value: 1,
    description: "Hanafi",
  },
} as const

export type ISchool = (typeof school)[keyof typeof school]["value"]

//========================================
//
//
//========================================

export const prayerCalculationMethod = {
  Jafari: {
    value: 0,
    description: "Jafari / Shia Ithna-Ashari",
  },
  UIS: {
    value: 1,
    description: "University of Islamic Sciences, Karachi",
  },
  ISNA: {
    value: 2,
    description: "Islamic Society of North America",
  },
  MWL: {
    value: 3,
    description: "Muslim World League",
  },
  UAQU: {
    value: 4,
    description: "Umm Al-Qura University, Makkah",
  },
  Egypte: {
    value: 5,
    description: "Egyptian General Authority of Survey",
  },
  Morocco: {
    value: 21,
    description: "Morocco",
  },
} as const

export type IPrayerCalculationMethod =
  (typeof prayerCalculationMethod)[keyof typeof prayerCalculationMethod]["value"]
