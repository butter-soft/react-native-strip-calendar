import { generateWeeksInRange } from '../lib/generate-dates';
import {
  type Day,
  addWeeks,
  format,
  subWeeks,
  startOfWeek,
  subMonths,
  addMonths,
  isAfter,
  isBefore,
  endOfWeek,
} from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

export interface UseHorizontalCalendarOptions {
  initialDate?: Date;
  firstDay?: Day;
  startDate?: Date;
  endDate?: Date;
  onDateChange?: (date: string) => void;
}

export function useHorizontalCalendar({
  initialDate = new Date(),
  firstDay = 1,
  startDate,
  endDate,
  onDateChange,
}: UseHorizontalCalendarOptions = {}) {
  const [centerDate, setCenterDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(initialDate, 'yyyy-MM-dd'),
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
    return generateWeeksInRange(dateRange.start, dateRange.end, firstDay);
  }, [dateRange, firstDay]);

  const initialScrollIndex = useMemo(() => {
    const targetWeekStart = startOfWeek(initialDate, {
      weekStartsOn: firstDay,
    });
    const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;

    const index = weeksData.findIndex((week) => week.id === targetWeekId);
    return index >= 0 ? index : Math.floor(weeksData.length / 2);
  }, [weeksData, initialDate, firstDay]);

  const currentScrollIndex = useMemo(() => {
    const targetWeekStart = startOfWeek(centerDate, {
      weekStartsOn: firstDay,
    });
    const targetWeekId = `week-${format(targetWeekStart, 'yyyy-MM-dd')}`;

    const index = weeksData.findIndex((week) => week.id === targetWeekId);

    return index >= 0 ? index : Math.floor(weeksData.length / 2);
  }, [weeksData, centerDate, firstDay]);

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      onDateChange?.(date);
    },
    [onDateChange],
  );

  // 수정된 범위 체크 함수들
  const canGoNext = useMemo(() => {
    if (!startDate || !endDate) {
      return true;
    }

    const nextWeek = addWeeks(centerDate, 1);
    const nextWeekStart = startOfWeek(nextWeek, { weekStartsOn: firstDay });

    // 다음 주의 시작일이 endDate를 넘지 않아야 함
    return !isAfter(nextWeekStart, endDate);
  }, [centerDate, startDate, endDate, firstDay]);

  const canGoPrevious = useMemo(() => {
    if (!startDate || !endDate) {
      return true;
    }

    const prevWeek = subWeeks(centerDate, 1);
    const prevWeekEnd = endOfWeek(prevWeek, { weekStartsOn: firstDay });

    // 이전 주의 종료일이 startDate보다 이전이 아니어야 함
    // 즉, 이전 주가 startDate와 겹치는 부분이 있어야 함
    return !isBefore(prevWeekEnd, startDate);
  }, [centerDate, startDate, endDate, firstDay]);

  const goToNextWeek = useCallback(() => {
    if (canGoNext) {
      setCenterDate((prev) => addWeeks(prev, 1));
    }
  }, [canGoNext]);

  const goToPreviousWeek = useCallback(() => {
    if (canGoPrevious) {
      setCenterDate((prev) => subWeeks(prev, 1));
    }
  }, [canGoPrevious]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCenterDate(today);
    setSelectedDate(format(today, 'yyyy-MM-dd'));
  }, []);

  const scrollToWeek = useCallback((targetDate: Date) => {
    setCenterDate(targetDate);
  }, []);

  return {
    weeksData,
    selectedDate,
    centerDate,
    initialScrollIndex,
    currentScrollIndex,
    canGoNext,
    canGoPrevious,
    handleDateSelect,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    scrollToWeek,
  };
}
