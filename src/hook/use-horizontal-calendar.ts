import { generateWeeksInRange } from '../lib/generate-dates';
import { type Day, format, startOfWeek, subMonths, addMonths } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

export interface UseHorizontalCalendarOptions {
  firstDay?: Day;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

export function useHorizontalCalendar({
  firstDay = 1,
  startDate,
  endDate,
  minDate,
  maxDate,
  selectedDate: externalSelectedDate,
  onDateChange,
}: UseHorizontalCalendarOptions = {}) {
  const [selectedDate, setSelectedDate] = useState<string>(
    externalSelectedDate || format(new Date(), 'yyyy-MM-dd'),
  );

  const dateRange = useMemo(() => {
    if (startDate && endDate) {
      return { start: startDate, end: endDate };
    }

    const now = new Date();
    return {
      start: subMonths(now, 6),
      end: addMonths(now, 6),
    };
  }, [startDate, endDate]);

  const weeksData = useMemo(() => {
    return generateWeeksInRange(
      dateRange.start,
      dateRange.end,
      firstDay,
      minDate,
      maxDate,
    );
  }, [dateRange, firstDay, minDate, maxDate]);

  const initialScrollIndex = useMemo(() => {
    const targetDate = externalSelectedDate
      ? new Date(externalSelectedDate)
      : new Date();

    const targetWeekStart = startOfWeek(targetDate, {
      weekStartsOn: firstDay,
    });
    const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;

    const index = weeksData.findIndex((week) => week.id === targetWeekId);

    return index >= 0 ? index : Math.floor(weeksData.length / 2);
  }, [weeksData, firstDay, externalSelectedDate]);

  const [currentScrollIndex, setCurrentScrollIndex] =
    useState(initialScrollIndex);

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      onDateChange?.(date);

      const selectedDateObj = new Date(date);
      const targetWeekStart = startOfWeek(selectedDateObj, {
        weekStartsOn: firstDay,
      });
      const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;
      const weekIndex = weeksData.findIndex((week) => week.id === targetWeekId);

      if (weekIndex >= 0) {
        setCurrentScrollIndex(weekIndex);
      }
    },
    [onDateChange, weeksData, firstDay, currentScrollIndex],
  );

  const canGoNext = useMemo(() => {
    return currentScrollIndex < weeksData.length - 1;
  }, [currentScrollIndex, weeksData.length]);

  const canGoPrevious = useMemo(() => {
    return currentScrollIndex > 0;
  }, [currentScrollIndex]);

  const goToNextWeek = useCallback(() => {
    if (canGoNext) {
      setCurrentScrollIndex((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPreviousWeek = useCallback(() => {
    if (canGoPrevious) {
      setCurrentScrollIndex((prev) => prev - 1);
    }
  }, [canGoPrevious]);

  const goToToday = useCallback(() => {
    const today = new Date();

    setSelectedDate(format(today, 'yyyy-MM-dd'));

    const targetWeekStart = startOfWeek(today, { weekStartsOn: firstDay });
    const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;
    const index = weeksData.findIndex((week) => week.id === targetWeekId);

    if (index >= 0) {
      setCurrentScrollIndex(index);
    }
  }, [weeksData, firstDay]);

  const scrollToWeek = useCallback(
    (targetDate: Date) => {
      const targetWeekStart = startOfWeek(targetDate, {
        weekStartsOn: firstDay,
      });
      const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;
      const index = weeksData.findIndex((week) => week.id === targetWeekId);

      if (index >= 0) {
        setCurrentScrollIndex(index);
      }
    },
    [weeksData, firstDay],
  );

  return {
    weeksData,
    selectedDate,
    currentScrollIndex,
    initialScrollIndex,
    canGoNext,
    canGoPrevious,
    handleDateSelect,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    scrollToWeek,
  };
}
