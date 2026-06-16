import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const aladhanApi = axios.create({
  //
  // https://aladhan.com/islamic-calendar-api#description/introduction
  //
  baseURL: "https://api.aladhan.com/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type IAladhanResponse<T> = {
  code: number;
  status: string;
  data: T;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function buildSearchParams(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
}
