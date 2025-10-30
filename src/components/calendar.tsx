import { useHorizontalCalendar } from '../hook/use-horizontal-calendar';
import { StripCalendarContext, useStripCalendarContext } from './context';
import { Day, type DayProps } from './day';
import { Week } from './week';
import { LegendList, type LegendListRef } from '@legendapp/list';
import { type Day as DateFnsDay, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useRef, type ReactNode, useEffect, useCallback } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface StripCalendarProps {
  firstDay?: DateFnsDay;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  containerHeight?: number;
  dayWidth?: number;
  markedDates?: string[];
  classNames?: string;
  styles?: StyleProp<ViewStyle>;
  locale?: Locale;
  children?: ReactNode;
}

export function StripCalendar({
  firstDay = 1,
  startDate,
  endDate,
  minDate,
  maxDate,
  onDateChange,
  selectedDate: externalSelectedDate,
  containerHeight = 60,
  dayWidth = 48,
  locale = enUS,
  markedDates,
  classNames,
  styles,
  children,
}: StripCalendarProps) {
  const {
    weeksData,
    selectedDate,
    handleDateSelect,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    initialScrollIndex,
    currentScrollIndex,
    canGoNext,
    canGoPrevious,
  } = useHorizontalCalendar({
    firstDay,
    startDate,
    endDate,
    minDate,
    maxDate,
    selectedDate: externalSelectedDate,
    onDateChange,
  });

  const currentSelectedDate = externalSelectedDate || selectedDate;

  const contextValue = {
    dayWidth,
    weeksData,
    selectedDate: currentSelectedDate,
    onDateSelect: handleDateSelect,
    locale,
    markedDates,
    canGoNext,
    canGoPrevious,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    initialScrollIndex,
    currentScrollIndex,
  };

  return (
    <StripCalendarContext.Provider value={contextValue}>
      <View
        className={classNames}
        style={[{ height: containerHeight, width: '100%' }, styles]}
      >
        {children}
      </View>
    </StripCalendarContext.Provider>
  );
}

StripCalendar.Header = function ({
  children,
  className,
  style,
}: {
  children: (dateString: string) => ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { selectedDate } = useStripCalendarContext();

  return (
    <View className={className} style={[style]}>
      {children(selectedDate)}
    </View>
  );
};

StripCalendar.Week = function ({
  className = {
    container: '',
    week: '',
  },
  style = {
    container: {},
    content: {},
    week: {},
  },
  columnGap,
  dayProps: weekDayProps,
}: {
  className?: {
    container?: string;
    week?: string;
  };
  style?: {
    container?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    week?: StyleProp<ViewStyle>;
  };
  dayProps?: Omit<DayProps, 'date'>;
  columnGap?: number;
}) {
  const isInitialMount = useRef(true);
  const listRef = useRef<LegendListRef>(null);

  const {
    dayWidth,
    selectedDate,
    weeksData,
    initialScrollIndex,
    currentScrollIndex,
  } = useStripCalendarContext();

  const moveToIndex = useCallback((currentScrollIndex: number) => {
    requestAnimationFrame(() => {
      if (currentScrollIndex >= 0) {
        listRef.current?.scrollToIndex?.({
          index: currentScrollIndex,
          animated: true,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    moveToIndex(currentScrollIndex);
  }, [moveToIndex, currentScrollIndex, selectedDate]);

  return (
    <View style={defaultStyles.weekContainer}>
      <LegendList
        ref={listRef}
        data={weeksData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Week className={className.week} style={style.week}>
            {item.dates.map((date) => (
              <Day key={date.id} date={date} {...weekDayProps} />
            ))}
          </Week>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        className={className.container}
        style={[defaultStyles.listContainer, style.container]}
        getEstimatedItemSize={() => dayWidth * 7 + (columnGap ?? 12) * 6}
        contentContainerStyle={[defaultStyles.listContent, style.content]}
        initialScrollIndex={initialScrollIndex}
        ItemSeparatorComponent={() => (
          <View style={{ width: columnGap ?? 12 }} />
        )}
      />
    </View>
  );
};

StripCalendar.Day = function (props: DayProps) {
  return <Day {...props} />;
};

StripCalendar.PreviousButton = function ({
  children,
  className,
  style,
}: {
  children: ({ disabled }: { disabled: boolean }) => ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { goToPreviousWeek, canGoPrevious } = useStripCalendarContext();

  return (
    <Pressable
      className={className}
      style={style}
      onTouchStart={goToPreviousWeek}
      disabled={!canGoPrevious}
    >
      {children({ disabled: !canGoPrevious })}
    </Pressable>
  );
};

StripCalendar.NextButton = function ({
  children,
  className,
  style,
}: {
  children: ({ disabled }: { disabled: boolean }) => ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { goToNextWeek, canGoNext } = useStripCalendarContext();

  return (
    <Pressable
      className={className}
      style={style}
      onTouchStart={goToNextWeek}
      disabled={!canGoNext}
    >
      {children({ disabled: !canGoNext })}
    </Pressable>
  );
};

StripCalendar.TodayButton = function ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { goToToday } = useStripCalendarContext();

  return (
    <Pressable className={className} style={style} onTouchStart={goToToday}>
      {children}
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekContainer: {
    flex: 1,
  },
  listContainer: {
    height: 70,
  },
  listContent: {
    height: '100%',
  },
});
