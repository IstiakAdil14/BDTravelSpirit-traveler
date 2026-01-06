"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface Calendar05Props {
  selected?: DateRange | undefined;
  onSelect?: (dateRange: DateRange | undefined) => void;
}

export function Calendar05({ selected, onSelect }: Calendar05Props) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  })

  React.useEffect(() => {
    if (!selected) {
      setDateRange(undefined);
    }
  }, [selected]);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onSelect?.(range);
  };

  return (
    <Calendar
      mode="range"
      defaultMonth={selected?.from || dateRange?.from}
      selected={selected}
      onSelect={handleSelect}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
      classNames={{
        range_start: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-l-md",
        range_middle: "bg-emerald-200 text-blue-900",
        range_end: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-r-md",
      }}
    />
  )
}
