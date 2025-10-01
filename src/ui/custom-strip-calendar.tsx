import React from 'react';

import { LegendList } from '@legendapp/list';
import { Day } from 'date-fns';

import { Pressable, View, Text } from 'react-native';

import { type CalendarDate, type WeekData } from '../lib/generate-dates';
import { useHorizontalCalendar } from '../hook/use-horizontal-calendar';

const DAY_NAMES = {
  'ko-KR': {
    sundayFirst: ['일', '월', '화', '수', '목', '금', '토'],
    mondayFirst: ['월', '화', '수', '목', '금', '토', '일'],
  },
  'en-US': {
    sundayFirst: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    mondayFirst: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  'ja-JP': {
    sundayFirst: ['日', '月', '火', '水', '木', '金', '土'],
    mondayFirst: ['月', '火', '水', '木', '金', '土', '日'],
  },
  'zh-Hans': {
    sundayFirst: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    mondayFirst: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  'zh-Hant': {
    sundayFirst: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    mondayFirst: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
} as const;

interface CustomStripCalendarProps {
  initialDate?: Date;
  firstDay?: Day;
  weekCount?: number;
  onDateChange?: (date: string) => void;
  selectedDate?: string;
  showDayNames?: boolean;
  itemWidth?: number;
}

interface DayItemProps {
  date: CalendarDate;
  selectedDate: string;
  onPress: (dateString: string) => void;
  itemWidth: number;
}

function DayItem({ date, selectedDate, onPress, itemWidth }: DayItemProps) {
  const isSelected = date.dateString === selectedDate;

  return (
    <Pressable
      style={{ width: itemWidth }}
      onPress={() => onPress(date.dateString)}
    >
      <View>
        <Text>{date.day}</Text>
      </View>
    </Pressable>
  );
}

interface WeekItemProps {
  week: WeekData;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  itemWidth: number;
}

function WeekItem({
  week,
  selectedDate,
  onDateSelect,
  itemWidth,
}: WeekItemProps) {
  return (
    <View>
      {week.dates.map((date) => (
        <DayItem
          key={date.id}
          date={date}
          selectedDate={selectedDate}
          onPress={onDateSelect}
          itemWidth={itemWidth}
        />
      ))}
    </View>
  );
}

export default function CustomStripCalendar({
  initialDate,
  firstDay = 1,
  weekCount = 52,
  onDateChange,
  selectedDate: externalSelectedDate,
  showDayNames = true,
  itemWidth = 48,
}: CustomStripCalendarProps) {
  const { weeksData, selectedDate, handleDateSelect } = useHorizontalCalendar({
    initialDate,
    firstDay,
    weekCount,
    onDateChange,
  });

  const currentSelectedDate = externalSelectedDate || selectedDate;

  const dayNames =
    firstDay === 1
      ? DAY_NAMES['en-US'].mondayFirst
      : DAY_NAMES['en-US'].sundayFirst;

  return (
    <View>
      {showDayNames && (
        <View>
          {dayNames.map((day) => (
            <View key={day} style={{ width: itemWidth }}>
              <Text>{day}</Text>
            </View>
          ))}
        </View>
      )}

      <LegendList
        data={weeksData}
        renderItem={({ item }: { item: WeekData }) => (
          <WeekItem
            week={item}
            selectedDate={currentSelectedDate}
            onDateSelect={handleDateSelect}
            itemWidth={itemWidth}
          />
        )}
        estimatedItemSize={60}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
