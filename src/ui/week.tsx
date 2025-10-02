import type { CalendarDate, WeekData } from '../lib/generate-dates';
import DayItem, { type DayItemClassNames, type DayItemStyles } from './day';
import type { Locale } from 'date-fns';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface WeekItemClassNames extends DayItemClassNames {
  weekContainer?: string;
}

export interface WeekItemStyles extends DayItemStyles {
  weekContainer?: StyleProp<ViewStyle>;
}

export interface WeekItemProps {
  week: WeekData;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  itemWidth: number;
  locale: Locale;
  renderDay?: ({
    date,
    markedDates,
  }: {
    date: CalendarDate;
    markedDates?: string[];
  }) => ReactNode;
  markedDates?: string[];
  classNames?: WeekItemClassNames;
  styles?: WeekItemStyles;
}

export function WeekItem({
  week,
  selectedDate,
  onDateSelect,
  itemWidth,
  locale,
  renderDay,
  markedDates,
  classNames = {
    weekContainer: '',
  },
  styles = {},
}: WeekItemProps) {
  const { weekContainer: weekContainerClassName, ...dayClassNames } =
    classNames;
  const { weekContainer: weekContainerStyles, ...dayStyles } = styles;

  return (
    <View
      className={classNames.weekContainer}
      style={[defaultStyles.weekContainer, styles.weekContainer]}
    >
      {week.dates.map((date) =>
        renderDay ? (
          renderDay({ date, markedDates })
        ) : (
          <DayItem
            key={date.id}
            classNames={dayClassNames}
            styles={dayStyles}
            date={date}
            selectedDate={selectedDate}
            onPress={onDateSelect}
            itemWidth={itemWidth}
            locale={locale}
          />
        ),
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
  },
});
