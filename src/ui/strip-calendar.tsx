import { useHorizontalCalendar } from '../hook/use-horizontal-calendar';
import type { CalendarDate, WeekData } from '../lib/generate-dates';
import { WeekItem, type WeekItemClassNames, type WeekItemStyles } from './week';
import { LegendList, type LegendListRef } from '@legendapp/list';
import { format, type Day, type Locale } from 'date-fns';
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
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface StripCalendarProps {
  initialDate?: Date;
  firstDay?: Day;
  startDate?: Date;
  endDate?: Date;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  containerHeight?: number;
  itemWidth?: number;
  markedDates?: string[];
  classNames?: WeekItemClassNames & {
    container?: string;
    calendarContainer?: string;
    calendarVirtualListContainer?: string;
    header?: string;
  };
  styles?: WeekItemStyles & {
    container?: StyleProp<ViewStyle>;
    calendarContainer?: StyleProp<ViewStyle>;
    calendarVirtualListContainer?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
  };
  locale?: Locale;
  previousButton?: ReactNode;
  nextButton?: ReactNode;
  renderHeader?: (dateString: string) => ReactNode;
  renderDay?: ({
    date,
    markedDates,
  }: {
    date: CalendarDate;
    markedDates?: string[];
  }) => ReactNode;
}

export function StripCalendar({
  initialDate,
  firstDay = 1,
  startDate,
  endDate,
  onDateChange,
  selectedDate: externalSelectedDate,
  containerHeight = 60,
  itemWidth = 48,
  locale = enUS,
  markedDates,
  classNames = {
    container: '',
    calendarContainer: '',
    calendarVirtualListContainer: '',
    header: '',
  },
  styles = {
    container: {},
    calendarContainer: {},
    calendarVirtualListContainer: {},
    header: {},
  },
  previousButton,
  nextButton,
  renderDay,
  renderHeader,
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
    onDateChange,
  });

  const listRef = useRef<LegendListRef>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const currentSelectedDate = externalSelectedDate || selectedDate;

  const {
    container: containerClassName,
    calendarContainer: calendarContainerClassName,
    calendarVirtualListContainer: calendarVirtualListContainerClassName,
    header: headerClassName,
    ...weekClassNames
  } = classNames;
  const {
    container: containerStyles,
    calendarContainer: calendarContainerStyles,
    calendarVirtualListContainer: calendarVirtualListContainerStyles,
    header: headerStyles,
    ...weekStyles
  } = styles;

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
    if (listRef.current && currentScrollIndex >= 0 && hasInitialized) {
      listRef.current?.scrollToIndex?.({
        index: currentScrollIndex,
        animated: true,
      });
    }
  }, [currentScrollIndex]);

  return (
    <View
      className={containerClassName}
      style={[containerStyles, { height: containerHeight }]}
    >
      {renderHeader?.(currentSelectedDate) ?? (
        <View className={headerClassName} style={headerStyles}>
          <Text>{format(currentSelectedDate, 'yyyy-MM-dd', { locale })}</Text>
        </View>
      )}
      <View
        className={calendarContainerClassName}
        style={[defaultStyles.calendarContainer, calendarContainerStyles]}
      >
        {previousButton ?? (
          <Pressable onPress={goToPreviousWeek} disabled={!canGoPrevious}>
            {previousButton}
          </Pressable>
        )}
        <LegendList
          ref={listRef}
          data={weeksData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: WeekData }) => (
            <WeekItem
              week={item}
              selectedDate={currentSelectedDate}
              onDateSelect={handleDateSelect}
              itemWidth={itemWidth}
              locale={locale}
              renderDay={renderDay}
              markedDates={markedDates}
              classNames={weekClassNames}
              styles={weekStyles}
            />
          )}
          estimatedItemSize={itemWidth}
          horizontal
          showsHorizontalScrollIndicator={false}
          className={calendarVirtualListContainerClassName}
          contentContainerStyle={calendarVirtualListContainerStyles}
          onLayout={handleInitialLayout}
        />
        {nextButton ?? (
          <Pressable onPress={goToNextWeek} disabled={!canGoNext}>
            {nextButton}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});
