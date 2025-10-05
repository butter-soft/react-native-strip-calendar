import { useHorizontalCalendar } from '../hook/use-horizontal-calendar';
import type { CalendarDate, WeekData } from '../lib/generate-dates';
import { StripCalendarContext, useStripCalendarContext } from './context';
import { Day, type DayProps } from './day';
import { Week } from './week';
import { LegendList, type LegendListRef } from '@legendapp/list';
import { type Day as DateFnsDay, type Locale } from 'date-fns';
import { parseISO, isSameDay, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  useCallback,
  useRef,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface StripCalendarProps {
  initialDate?: Date;
  firstDay?: DateFnsDay;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  containerHeight?: number;
  itemWidth?: number;
  markedDates?: string[];
  classNames?: string;
  styles?: StyleProp<ViewStyle>;
  locale?: Locale;
  children?: ReactNode;
}

export function StripCalendar({
  initialDate,
  firstDay = 1,
  startDate,
  endDate,
  minDate,
  maxDate,
  onDateChange,
  selectedDate: externalSelectedDate,
  containerHeight = 60,
  itemWidth = 48,
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
    initialScrollIndex,
    currentScrollIndex,
    canGoNext,
    canGoPrevious,
  } = useHorizontalCalendar({
    initialDate,
    firstDay,
    startDate,
    endDate,
    minDate,
    maxDate,
    onDateChange,
  });

  const currentSelectedDate = externalSelectedDate || selectedDate;

  const contextValue = {
    weeksData,
    selectedDate: currentSelectedDate,
    onDateSelect: handleDateSelect,
    itemWidth,
    locale,
    markedDates,
    canGoNext,
    canGoPrevious,
    goToNextWeek,
    goToPreviousWeek,
    initialScrollIndex,
    currentScrollIndex,
  };

  return (
    <StripCalendarContext.Provider value={contextValue}>
      <View
        className={classNames}
        style={[{ height: containerHeight }, styles]}
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
  containerHeight,
  dayProps: weekDayProps,
  renderDay: weekRenderDay,
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
  containerHeight?: number;
  renderDay?: (props: {
    date: CalendarDate;
    isSelected: boolean;
    isDisabled: boolean;
    isMarked: boolean;
    dayName: string;
    dayNumber: number;
    onPress: () => void;
  }) => ReactNode;
}) {
  const listRef = useRef<LegendListRef>(null);

  const [hasInitialized, setHasInitialized] = useState(false);

  const {
    weeksData,
    itemWidth,
    initialScrollIndex,
    currentScrollIndex,
    selectedDate,
    markedDates = [],
    onDateSelect,
    locale,
  } = useStripCalendarContext();

  const handleInitialLayout = useCallback(() => {
    if (listRef.current && initialScrollIndex >= 0) {
      listRef.current?.scrollToIndex?.({
        index: initialScrollIndex,
        animated: false,
      });
      setHasInitialized(true);
    }
  }, [initialScrollIndex]);

  useEffect(() => {
    if (listRef.current && currentScrollIndex >= 0) {
      console.log('currentScrollIndex', currentScrollIndex);

      listRef.current?.scrollToIndex?.({
        index: currentScrollIndex,
        animated: true,
      });
    }
  }, [currentScrollIndex]);

  return (
    <View style={{ width: '100%', height: containerHeight ?? 100 }}>
      <LegendList
        ref={listRef}
        data={weeksData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: WeekData }) => (
          <Week className={className.week} style={style.week}>
            {item.dates.map((date) => {
              if (weekRenderDay) {
                const currentDate = parseISO(date.dateString);
                const selectedDateObj = parseISO(selectedDate);
                const isSelected = isSameDay(currentDate, selectedDateObj);
                const isMarked = markedDates.some((markedDate) =>
                  isSameDay(currentDate, parseISO(markedDate)),
                );
                const isDisabled = date.isDisabled;

                return (
                  <View key={date.id}>
                    {weekRenderDay({
                      date,
                      isSelected,
                      isDisabled,
                      isMarked,
                      dayName: format(currentDate, 'eee', { locale }),
                      dayNumber: date.day,
                      onPress: () => onDateSelect(date.dateString),
                    })}
                  </View>
                );
              } else {
                return <Day key={date.id} date={date} {...weekDayProps} />;
              }
            })}
          </Week>
        )}
        estimatedItemSize={itemWidth * 7}
        horizontal
        showsHorizontalScrollIndicator={false}
        className={className.container}
        style={[defaultStyles.listContainer, style.container]}
        contentContainerStyle={[defaultStyles.listContent, style.content]}
        ItemSeparatorComponent={() => (
          <View style={{ width: columnGap ?? 12 }} />
        )}
        onLayout={handleInitialLayout}
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

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    height: 70,
  },
  listContent: {
    height: '100%',
  },
});
