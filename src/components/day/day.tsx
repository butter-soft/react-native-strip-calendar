import type { CalendarDate } from '../../lib/generate-dates';
import { useStripCalendarContext } from '../context';
import {
  applyStateClassNames,
  applyStateStyles,
  type DayStateClassNames,
  type DayStateStyles,
} from './variant';
import { format, isSameDay, isToday as isTodayFn, parseISO } from 'date-fns';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

export interface DayProps {
  date: CalendarDate;
  classNames?: DayStateClassNames;
  styles?: DayStateStyles;
  formatString?: {
    dayName?: string;
    dayNumber?: string;
  };
  renderDay?: (props: DayRenderProps) => ReactNode;
}

export interface DayRenderProps {
  date: CalendarDate;
  isMarked: boolean;
  dayName: string;
  dayNumber: number;
  onPress: () => void;
}

export function Day({
  date,
  classNames = {
    base: {},
    today: {},
    selected: {},
    disabled: {},
  },
  styles = {
    base: {
      container: {},
      dayName: {},
      dayNumberContainer: {},
      dayNumber: {},
      indicator: {},
    },
    today: {
      container: {},
      dayName: {},
      dayNumberContainer: {},
      dayNumber: {},
      indicator: {},
    },
    selected: {
      container: {},
      dayName: {},
      dayNumberContainer: {},
      dayNumber: {},
      indicator: {},
    },
    disabled: {
      container: {},
      dayName: {},
      dayNumberContainer: {},
      dayNumber: {},
      indicator: {},
    },
  },
  formatString,
  renderDay,
}: DayProps) {
  const {
    selectedDate,
    markedDates = [],
    onDateSelect,
    locale,
  } = useStripCalendarContext();

  const currentDate = parseISO(date.dateString);
  const selectedDateObj = parseISO(selectedDate);

  const states = {
    isToday: isTodayFn(currentDate),
    isSelected: isSameDay(currentDate, selectedDateObj),
    isDisabled: date.isDisabled,
    isMarked: markedDates.some((markedDate) =>
      isSameDay(currentDate, parseISO(markedDate)),
    ),
  };

  const defaultFormatString = {
    dayName: 'eee',
    dayNumber: 'd',
  };

  const handlePress = () => onDateSelect(date.dateString);

  if (renderDay) {
    return renderDay({
      date,
      isMarked: states.isMarked,
      dayName: format(
        currentDate,
        formatString?.dayName ?? defaultFormatString.dayName,
        { locale },
      ),
      dayNumber: date.day,
      onPress: handlePress,
    });
  }

  const elementClassNames = applyStateClassNames(
    classNames.base ?? {},
    {
      today: classNames.today,
      selected: classNames.selected,
      disabled: classNames.disabled,
    },
    states,
  );

  const elementStyles = applyStateStyles(
    styles.base ?? {},
    {
      today: styles.today,
      selected: styles.selected,
      disabled: styles.disabled,
    },
    states,
  );

  return (
    <Pressable
      className={elementClassNames.container}
      style={elementStyles.container}
      disabled={states.isDisabled}
      onPress={handlePress}
    >
      <Text className={elementClassNames.dayName} style={elementStyles.dayName}>
        {format(
          currentDate,
          formatString?.dayName ?? defaultFormatString.dayName,
          { locale },
        )}
      </Text>
      <View
        className={elementClassNames.dayNumberContainer}
        style={elementStyles.dayNumberContainer}
      >
        <Text
          className={elementClassNames.dayNumber}
          style={elementStyles.dayNumber}
        >
          {format(
            currentDate,
            formatString?.dayNumber ?? defaultFormatString.dayNumber,
            { locale },
          )}
        </Text>
        {states.isMarked && (
          <View
            className={elementClassNames.indicator}
            style={elementStyles.indicator}
          />
        )}
      </View>
    </Pressable>
  );
}
