import type { CalendarDate } from '../lib/generate-dates';
import { format, type Locale } from 'date-fns';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export interface DayItemClassNames {
  dayContainer?: string;
  dayName?: string;
  dayNumber?: string;
  markedDate?: string;
}

export interface DayItemStyles {
  dayContainer?: StyleProp<ViewStyle>;
  dayName?: StyleProp<TextStyle>;
  dayNumber?: StyleProp<TextStyle>;
  markedDate?: StyleProp<ViewStyle>;
}

export interface DayItemProps {
  date: CalendarDate;
  selectedDate: string;
  onPress: (dateString: string) => void;
  itemWidth: number;
  locale: Locale;
  markedDates?: string[];
  classNames?: DayItemClassNames;
  styles?: DayItemStyles;
}

export default function Day({
  date,
  selectedDate,
  onPress,
  itemWidth,
  locale,
  markedDates,
  classNames = {
    dayContainer: '',
    dayName: '',
    dayNumber: '',
    markedDate: '',
  },
  styles = {},
}: DayItemProps) {
  const isSelected = date.dateString === selectedDate;

  const dayName = format(date.dateString, 'eee', { locale });

  const isMarked = markedDates?.includes(date.dateString);

  return (
    <Pressable
      className={classNames.dayContainer}
      style={[styles.dayContainer, { width: itemWidth }]}
      onPress={() => onPress(date.dateString)}
      data-selected={isSelected}
    >
      <Text className={classNames.dayName} style={styles.dayName}>
        {dayName}
      </Text>
      <Text className={classNames.dayNumber} style={styles.dayNumber}>
        {date.day}
      </Text>
      {isMarked && (
        <View
          className={classNames.markedDate}
          style={[defaultStyles.markedDate, styles.markedDate]}
        />
      )}
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  markedDate: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
  },
});
