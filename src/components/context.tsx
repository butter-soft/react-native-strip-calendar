import type { WeekData } from '../lib/generate-dates';
import type { Locale } from 'date-fns';
import { createContext, useContext } from 'react';

export interface StripCalendarContextValue {
  dayWidth: number;
  containerHeight: number;
  weeksData: WeekData[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: Locale;
  markedDates?: string[];
  initialScrollIndex: number;
  currentScrollIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
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
