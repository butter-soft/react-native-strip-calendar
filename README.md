# React Native Strip Calendar

A headless, customizable horizontal strip calendar component for React Native with virtualized scrolling and flexible styling support.

## Features

- 📅 **Flexible Date Range**: Define custom start and end dates
- 🎨 **Headless Design**: Support for both StyleSheet and className (NativeWind) styling
- ⚡ **Virtualized Scrolling**: Smooth performance with large date ranges using `@legendapp/list`
- 🌍 **Internationalization**: Built-in support for multiple locales via `date-fns`
- 📱 **React Native Compatible**: Works with React Native and React Native Web
- 🎯 **Customizable Rendering**: Custom day and header rendering functions
- 📊 **Marked Dates**: Support for highlighting specific dates
- 🔄 **Navigation Controls**: Previous/Next week navigation with boundary checks

## Installation

```bash
npm install react-native-strip-calendar
# or
yarn add react-native-strip-calendar
# or
pnpm add react-native-strip-calendar
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-native react-native-web
```

## Basic Usage

```tsx
import { StripCalendar } from 'react-native-strip-calendar';

export default function MyComponent() {
  return (
    <StripCalendar
      startDate={new Date('2025-01-01')}
      endDate={new Date('2025-12-31')}
      initialDate={new Date()}
      onDateChange={(date) => console.log('Selected date:', date)}
    />
  );
}
```

## Props

### StripCalendarProps

| Prop              | Type                                   | Default      | Description                                    |
| ----------------- | -------------------------------------- | ------------ | ---------------------------------------------- |
| `initialDate`     | `Date`                                 | `new Date()` | Initial date to display                        |
| `firstDay`        | `Day`                                  | `1`          | First day of the week (0 = Sunday, 1 = Monday) |
| `startDate`       | `Date`                                 | `undefined`  | Start date of the calendar range               |
| `endDate`         | `Date`                                 | `undefined`  | End date of the calendar range                 |
| `selectedDate`    | `string`                               | `undefined`  | Currently selected date (YYYY-MM-DD format)    |
| `onDateChange`    | `(date: string) => void`               | `undefined`  | Callback when date is selected                 |
| `containerHeight` | `number`                               | `60`         | Height of the calendar container               |
| `itemWidth`       | `number`                               | `48`         | Width of each day item                         |
| `markedDates`     | `string[]`                             | `[]`         | Array of dates to mark (YYYY-MM-DD format)     |
| `classNames`      | `object`                               | `{}`         | CSS class names for styling (NativeWind)       |
| `styles`          | `object`                               | `{}`         | StyleSheet styles for styling                  |
| `locale`          | `Locale`                               | `enUS`       | Locale for date formatting                     |
| `renderHeader`    | `(dateString: string) => ReactNode`    | `undefined`  | Custom header renderer                         |
| `renderDay`       | `({ date, markedDates }) => ReactNode` | `undefined`  | Custom day renderer                            |
| `previousButton`  | `ReactNode`                            | `undefined`  | Custom previous button                         |
| `nextButton`      | `ReactNode`                            | `undefined`  | Custom next button                             |

## Styling

### StyleSheet Approach

```tsx
import { StyleSheet } from 'react-native';

<StripCalendar
  styles={{
    container: styles.container,
    calendarContainer: styles.calendarContainer,
    header: styles.header,
  }}
/>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### NativeWind/ClassName Approach

```tsx
<StripCalendar
  classNames={{
    container: 'bg-gray-100 p-4',
    calendarContainer: 'flex-row items-center',
    header: 'text-lg font-bold',
  }}
/>
```

## Custom Rendering

### Custom Header

```tsx
<StripCalendar
  renderHeader={(dateString) => (
    <Text style={styles.customHeader}>
      {format(new Date(dateString), 'MMMM yyyy')}
    </Text>
  )}
/>
```

### Custom Day

```tsx
<StripCalendar
  renderDay={({ date, markedDates }) => (
    <Pressable
      style={[
        styles.day,
        markedDates?.includes(date.dateString) && styles.markedDay,
      ]}
      onPress={() => onDateSelect(date.dateString)}
    >
      <Text style={styles.dayText}>{date.day}</Text>
    </Pressable>
  )}
/>
```

## Hooks

### useHorizontalCalendar

A custom hook that provides calendar state and navigation logic:

```tsx
import { useHorizontalCalendar } from 'react-native-strip-calendar';

const {
  weeksData,
  selectedDate,
  centerDate,
  initialScrollIndex,
  currentScrollIndex,
  canGoNext,
  canGoPrevious,
  handleDateSelect,
  goToNextWeek,
  goToPreviousWeek,
  goToToday,
  scrollToWeek,
} = useHorizontalCalendar({
  initialDate: new Date(),
  firstDay: 1,
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  onDateChange: (date) => console.log(date),
});
```

## Internationalization

```tsx
import { ko } from 'date-fns/locale';

<StripCalendar
  locale={ko}
  firstDay={1} // Monday
/>;
```

## Example

See the `example` directory for a complete working example.

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run example
pnpm example:android
pnpm example:ios
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
