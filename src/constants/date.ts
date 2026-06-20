interface DateFormat {
  id: string
  name: string
  example: string
  formatString: string
}

export const DATE_FORMATS: DateFormat[] = [
  {
    id: "date-iso",
    name: "ISO 8601",
    example: "2026-12-05",
    formatString: "yyyy-MM-dd",
  },
  {
    id: "date-us-short",
    name: "US Short",
    example: "12/05/2026",
    formatString: "MM/dd/yyyy",
  },
  {
    id: "date-uk-short",
    name: "UK/EU Short",
    example: "05/12/2026",
    formatString: "dd/MM/yyyy",
  },
  {
    id: "date-us-long",
    name: "US Long",
    example: "December 5, 2026",
    formatString: "MMMM d, yyyy",
  },
  {
    id: "date-uk-long",
    name: "UK Long",
    example: "5 December 2026",
    formatString: "d MMMM yyyy",
  },
  {
    id: "date-abbr-us",
    name: "Abbreviated US",
    example: "Dec 5, 2026",
    formatString: "MMM d, yyyy",
  },
  {
    id: "date-abbr-uk",
    name: "Abbreviated UK",
    example: "5 Dec 2026",
    formatString: "d MMM yyyy",
  },
  {
    id: "date-weekday",
    name: "Full Weekday + Date",
    example: "Saturday, December 5, 2026",
    formatString: "EEEE, MMMM d, yyyy",
  },
  {
    id: "date-military",
    name: "Military Date",
    example: "05 DEC 2026",
    formatString: "dd MMM yyyy",
  },
]

interface TimeFormat {
  id: string
  name: string
  example: string
  formatString: string
}

export const TIME_FORMATS: TimeFormat[] = [
  {
    id: "time-24h",
    name: "24-Hour",
    example: "15:30",
    formatString: "HH:mm",
  },
  {
    id: "time-12h",
    name: "12-Hour (AM/PM)",
    example: "3:30 PM",
    formatString: "h:mm a",
  },
  {
    id: "time-12h-leading",
    name: "12-Hour with Leading Zero",
    example: "03:30 PM",
    formatString: "hh:mm a",
  },
  {
    id: "time-24h-seconds",
    name: "24-Hour with Seconds",
    example: "15:30:45",
    formatString: "HH:mm:ss",
  },
  {
    id: "time-12h-seconds",
    name: "12-Hour with Seconds",
    example: "3:30:45 PM",
    formatString: "h:mm:ss a",
  },
  {
    id: "time-utc",
    name: "UTC Time",
    example: "15:30 UTC",
    formatString: "HH:mm 'UTC'",
  },
]
