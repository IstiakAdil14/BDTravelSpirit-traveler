"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Sparkles } from "lucide-react"

interface Calendar05Props {
  selected?: DateRange | undefined
  onSelect?: (dateRange: DateRange | undefined) => void
}

export function Calendar05({ selected, onSelect }: Calendar05Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const defaultRange: DateRange = {
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  }

  const [dateRange, setDateRange] = React.useState<DateRange>(
    selected ?? defaultRange
  )

  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selected?.from ?? dateRange.from ?? today
  )

  React.useEffect(() => {
    if (selected) setDateRange(selected)
  }, [selected])

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) return
    if (!range.to) {
      range.to = new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate() + 1)
    }
    setDateRange(range)
    onSelect?.(range)
  }

  const formatDate = (date?: Date) =>
    date?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "Select date"

  const calculateNights = () => {
    if (dateRange?.from && dateRange?.to) {
      const diffTime = dateRange.to.getTime() - dateRange.from.getTime()
      const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
      return diffDays
    }
    return 0
  }

  const nights = calculateNights()

  const handlePreviousMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-4 p-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-xl border border-orange-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <CalendarDays className="w-4 h-4 text-orange-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Select Your Dates</h3>
          {nights > 0 && (
            <span className="ml-auto px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Check-in
            </div>
            <div className="text-sm font-bold text-gray-900">{formatDate(dateRange?.from)}</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Check-out
            </div>
            <div className="text-sm font-bold text-gray-900">{formatDate(dateRange?.to)}</div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="relative overflow-x-auto">
        {/* Navigation Buttons */}

        <Calendar
          mode="range"
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={{ before: today }}
          className="rounded-xl border-2 border-gray-100 shadow-lg bg-white p-5"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0",
            month: "space-y-2.5",
            caption: "flex justify-center pt-1 relative items-center mb-2 text-base font-bold text-gray-900",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-gray-500 rounded-md w-9 font-semibold text-xs uppercase tracking-wide",
            row: "flex w-full mt-1",
            cell: "relative p-1 text-center text-sm",
            day: "h-9 w-9 p-0 font-medium text-sm hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 hover:border hover:border-green-200 rounded-lg transition-all duration-200 hover:shadow-sm",
            day_selected: "bg-gradient-to-br from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md font-semibold",
            day_today: "bg-purple-100 text-purple-900 font-bold border-2 border-purple-300 shadow-sm",
            day_range_middle: "bg-green-100 text-green-800 font-normal",
            day_range_start: "bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg shadow-lg font-semibold hover:from-green-700 hover:to-emerald-700",
            day_range_end: "bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg shadow-lg font-semibold hover:from-green-700 hover:to-emerald-700",
            day_outside: "text-gray-300 opacity-40",
            day_disabled: "text-gray-200 opacity-25 cursor-not-allowed",
          }}
        />
      </div>
    </div>
  )
}
