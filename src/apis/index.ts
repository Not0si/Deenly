import { useQuery } from "@tanstack/react-query";
import { aladhanApi, buildSearchParams, IAladhanResponse } from "./config";

interface IOptions {
  latitude: string;
  longitude: string;
  method?: number;
  shafaq?: string;
  tune?: string;
  school?: number;
  midnightMode?: string;
  timezonestring?: string;
  latitudeAdjustmentMethod?: string;
  calendarMethod?: string;
  iso8601?: boolean;
}

export const useGetPrayerTimes = (
  year: number,
  month: number,
  options: IOptions,
) => {
  const params = buildSearchParams(options as any);

  return useQuery<IAladhanResponse<IPrayerTime[]>>({
    queryKey: ["prayer_times"],
    queryFn: async () => {
      const { data } = await aladhanApi.get(
        `/calendar/${year}/${month}?${params}`,
      );

      console.log({ data });

      return data;
    },
    enabled: !!year && !!month && !!options.latitude && !!options.longitude,
  });
};

interface IPrayerOffset {
  Asr: number;
}

interface IPrayerTime {
  date: {
    gregorian: {
      date: string;
      day: string;
      format: string;
      lunarSighting: boolean;
      year: string;
      weekday: {
        en: string;
      };
      month: {
        en: string;
        number: number;
      };
      designation: {
        abbreviated: string;
        expanded: string;
      };
    };
    hijri: {
      adjustedHolidays: string[];
      date: string;
      day: string;
    };
    readable: string;
    timestamp: string;
  };
  timings: {
    Asr: string;
    Dhuhr: string;
    Fajr: string;
    Firstthird: string;
    Imsak: string;
    Isha: string;
    Lastthird: string;
    Maghrib: string;
    Midnight: string;
    Sunrise: string;
    Sunset: string;
  };
  meta: {
    latitude: number;
    longitude: number;
    latitudeAdjustmentMethod: string;
    midnightMode: string;
    school: string;
    timezone: string;
    offset: IPrayerOffset;
  };
}
