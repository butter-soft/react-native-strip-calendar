import type { CalendarDate, WeekData } from '../lib/generate-dates';
import type { DayProps } from './day/day';
import type { Locale } from 'date-fns';
import { createContext, useContext, type ReactNode } from 'react';

export interface StripCalendarContextValue {
  weeksData: WeekData[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  itemWidth: number;
  locale: Locale;
  markedDates?: string[];
  initialScrollIndex: number;
  currentScrollIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  renderDay?: (props: {
    date: CalendarDate;
    isSelected: boolean;
    isDisabled: boolean;
    isMarked: boolean;
    dayName: string;
    dayNumber: number;
    onPress: () => void;
  }) => ReactNode;
  dayProps?: Omit<DayProps, 'date'>;
}

const StripCalendarContext = createContext<StripCalendarContextValue | null>(
  null,
);

export function useStripCalendarContext() {
  const context = useContext(StripCalendarContext);

  if (!context) {
    throw new Error(
      'StripCalendar components must be used within StripCalendar',
    );
  }

  return context;
}

export { StripCalendarContext };
