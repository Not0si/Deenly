import { z } from "zod"

const PrayerTimeSchema = z.object({
  timings: z.object({
    Asr: z.string(),
    Dhuhr: z.string(),
    Fajr: z.string(),
    Firstthird: z.string(),
    Imsak: z.string(),
    Isha: z.string(),
    Lastthird: z.string(),
    Maghrib: z.string(),
    Midnight: z.string(),
    Sunrise: z.string(),
    Sunset: z.string(),
  }),

  date: z.object({
    hijri: z.object({
      date: z.string(),
      format: z.string(),
      year: z.string(),
      month: z.object({
        number: z.number(),
        days: z.number(),
        en: z.string(),
        ar: z.string(),
      }),
    }),
    readable: z.string(),
    timestamp: z.string(),
  }),
})

export const PrayerTimesSchema = z.array(PrayerTimeSchema)

export type IPrayerTime = z.infer<typeof PrayerTimeSchema>
