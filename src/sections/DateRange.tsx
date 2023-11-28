import {
  Button,
  CalendarCell,
  CalendarGrid,
  Heading,
  RangeCalendar,
} from 'react-aria-components'

export function DateRange() {
  return (
    <RangeCalendar className="mx-auto" aria-label="Trip dates">
      <header className="flex items-center justify-between gap-3 mb-4">
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>
        {(date) => (
          <CalendarCell
            className="p-1 m-1 text-center rounded-md selected:bg-indigo-500 selected:text-indigo-50"
            date={date}
          />
        )}
      </CalendarGrid>
    </RangeCalendar>
  )
}
