import { generateWeeksInRange } from '../lib/generate-dates';
import isParsableDateString from '../lib/is-parsable-date-string';
import { type Day, format, startOfWeek, subMonths, addMonths } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [internalDate, setInternalDate] = useState<string>(
    externalSelectedDate || format(new Date(), 'yyyy-MM-dd'),
  );

  const isControlled = !!externalSelectedDate;

  const selectedDate = isControlled ? externalSelectedDate : internalDate;

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
    let targetDate: Date;

    if (externalSelectedDate) {
      targetDate = new Date(externalSelectedDate);
    } else if (startDate) {
      targetDate = startDate;
    } else {
      targetDate = new Date();
    }

    const targetWeekStart = startOfWeek(targetDate, {
      weekStartsOn: firstDay,
    });
    const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;

    const index = weeksData.findIndex((week) => week.id === targetWeekId);

    return index >= 0 ? index : 0;
  }, [weeksData, firstDay, externalSelectedDate, startDate]);

  const [currentScrollIndex, setCurrentScrollIndex] =
    useState(initialScrollIndex);

  const handleDateChange = useCallback(
    (newDate: string) => {
      if (!isControlled) {
        setInternalDate(newDate);
      }

      if (onDateChange) {
        onDateChange(newDate);
      }
    },
    [isControlled, onDateChange],
  );

  const handleDateSelect = useCallback(
    (date: string) => {
      handleDateChange(date);
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
    [onDateChange, weeksData, firstDay],
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

    handleDateChange(format(today, 'yyyy-MM-dd'));

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

  useEffect(() => {
    if (!isParsableDateString(externalSelectedDate || '')) {
      return;
    }

    if (isControlled) {
      setCurrentScrollIndex(initialScrollIndex);
    }
  }, [isControlled, externalSelectedDate, initialScrollIndex]);

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
