import { Day, addWeeks, format, subWeeks } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { generateMultipleWeeks } from './generate-dates';

export interface UseHorizontalCalendarOptions {
  initialDate?: Date;
  firstDay?: Day;
  weekCount?: number;
  onDateChange?: (date: string) => void;
}

export function useHorizontalCalendar({
  initialDate = new Date(),
  firstDay = 1,
  weekCount = 52,
  onDateChange,
}: UseHorizontalCalendarOptions = {}) {
  const [centerDate, setCenterDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<string>(format(initialDate, 'yyyy-MM-dd'));

  const weeksData = useMemo(() => {
    return generateMultipleWeeks(centerDate, weekCount, firstDay);
  }, [centerDate, weekCount, firstDay]);

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      onDateChange?.(date);
    },
    [onDateChange]
  );

  const goToNextWeek = useCallback(() => {
    setCenterDate((prev) => addWeeks(prev, 1));
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCenterDate((prev) => subWeeks(prev, 1));
  }, []);

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
    handleDateSelect,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    scrollToWeek,
  };
}
