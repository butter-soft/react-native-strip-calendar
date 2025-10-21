import { useHorizontalCalendar } from '../hook/use-horizontal-calendar';
import type { WeekData } from '../lib/generate-dates';
import { StripCalendarContext, useStripCalendarContext } from './context';
import { Day, type DayProps } from './day';
import { Week } from './week';
import { LegendList, type LegendListRef } from '@legendapp/list';
import { type Day as DateFnsDay, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useRef, type ReactNode, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
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
    weeksData,
    selectedDate: currentSelectedDate,
    onDateSelect: handleDateSelect,
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
}) {
  const initialRender = useRef<boolean>(true);
  const listRef = useRef<LegendListRef>(null);

  const { width: windowWidth } = useWindowDimensions();

  const { weeksData, initialScrollIndex, currentScrollIndex } =
    useStripCalendarContext();

  useEffect(() => {
    console.log('currentScrollIndex', currentScrollIndex);

    if (currentScrollIndex >= 0 && !initialRender.current) {
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
            {item.dates.map((date) => (
              <Day key={date.id} date={date} {...weekDayProps} />
            ))}
          </Week>
        )}
        estimatedItemSize={windowWidth}
        horizontal
        showsHorizontalScrollIndicator={false}
        className={className.container}
        style={[defaultStyles.listContainer, style.container]}
        contentContainerStyle={[defaultStyles.listContent, style.content]}
        initialScrollIndex={initialScrollIndex}
        ItemSeparatorComponent={() => (
          <View style={{ width: columnGap ?? 12 }} />
        )}
        onLayout={() => {
          initialRender.current = false;
        }}
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
