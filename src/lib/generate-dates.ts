import {
  Day,
  addDays,
  addWeeks,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
  subWeeks,
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

export function generateWeekDates(
  baseDate: Date = new Date(),
  firstDay: Day = 1
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

export function generateMultipleWeeks(
  centerDate: Date = new Date(),
  weekCount: number = 52,
  firstDay: Day = 1
): WeekData[] {
  const weeks: WeekData[] = [];
  const halfWeeks = Math.floor(weekCount / 2);

  for (let i = halfWeeks; i > 0; i--) {
    const weekDate = subWeeks(centerDate, i);
    const weekStart = startOfWeek(weekDate, { weekStartsOn: firstDay });
    const weekEnd = endOfWeek(weekDate, { weekStartsOn: firstDay });

    weeks.push({
      id: `week-${format(weekStart, 'yyyy-MM-dd')}`,
      weekNumber: getWeekNumber(weekDate),
      startDate: format(weekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd'),
      dates: generateWeekDates(weekDate, firstDay),
    });
  }

  const centerWeekStart = startOfWeek(centerDate, {
    weekStartsOn: firstDay as any,
  });
  const centerWeekEnd = endOfWeek(centerDate, {
    weekStartsOn: firstDay as any,
  });

  weeks.push({
    id: `week-${format(centerWeekStart, 'yyyy-MM-dd')}`,
    weekNumber: getWeekNumber(centerDate),
    startDate: format(centerWeekStart, 'yyyy-MM-dd'),
    endDate: format(centerWeekEnd, 'yyyy-MM-dd'),
    dates: generateWeekDates(centerDate, firstDay),
  });

  for (let i = 1; i <= halfWeeks; i++) {
    const weekDate = addWeeks(centerDate, i);
    const weekStart = startOfWeek(weekDate, { weekStartsOn: firstDay });
    const weekEnd = endOfWeek(weekDate, { weekStartsOn: firstDay });

    weeks.push({
      id: `week-${format(weekStart, 'yyyy-MM-dd')}`,
      weekNumber: getWeekNumber(weekDate),
      startDate: format(weekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd'),
      dates: generateWeekDates(weekDate, firstDay),
    });
  }

  return weeks;
}

function getWeekNumber(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
}
