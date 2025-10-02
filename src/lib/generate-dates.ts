import {
  type Day,
  type Locale,
  addDays,
  addWeeks,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from 'date-fns';

export interface CalendarDate {
  id: string;
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  weekNumber: number;
}

export interface WeekData {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  dates: CalendarDate[];
}

export function generateDayNames({
  firstDay,
  locale,
  formatString = 'eee',
}: {
  firstDay: Day;
  locale: Locale;
  formatString?: string;
}): string[] {
  const dayNames: string[] = [];

  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDay + i) % 7;
    const date = new Date(2024, 0, dayIndex + 7);

    dayNames.push(format(date, formatString, { locale }));
  }

  return dayNames;
}

export function generateWeekDates(
  baseDate: Date = new Date(),
  firstDay: Day = 1,
): CalendarDate[] {
  const start = startOfWeek(baseDate, { weekStartsOn: firstDay });
  const dates: CalendarDate[] = [];
  const currentMonth = baseDate.getMonth();
  const weekNumber = getWeekNumber(baseDate);

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    const today = new Date();

    dates.push({
      id: format(date, 'yyyy-MM-dd'),
      dateString: format(date, 'yyyy-MM-dd'),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      timestamp: date.getTime(),
      isToday: isSameDay(date, today),
      isSelected: false,
      isCurrentMonth: date.getMonth() === currentMonth,
      weekNumber,
    });
  }

  return dates;
}

export function generateWeeksInRange(
  startDate: Date,
  endDate: Date,
  firstDay: Day = 1,
): WeekData[] {
  const weeks: WeekData[] = [];

  let currentWeekStart = startOfWeek(startDate, { weekStartsOn: firstDay });

  const endWeekEnd = endOfWeek(endDate, { weekStartsOn: firstDay });

  while (currentWeekStart <= endWeekEnd) {
    const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: firstDay });

    weeks.push({
      id: `week-${format(currentWeekStart, 'yyyy-MM-dd')}`,
      weekNumber: getWeekNumber(currentWeekStart),
      startDate: format(currentWeekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd'),
      dates: generateWeekDates(currentWeekStart, firstDay),
    });

    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  return weeks;
}

function getWeekNumber(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;

  return Math.floor(diff / oneWeek) + 1;
}
