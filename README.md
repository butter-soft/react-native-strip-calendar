# React Native Strip Calendar

<div align="center">

![화면 기록 2025-10-04 오후 2 52 31](https://github.com/user-attachments/assets/6043bdb5-9554-4cba-8b9e-9b44405355d8)

</div>

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
- 🧩 **Compound Components**: Modular design with Header, Week, Day, and Navigation components
- 📏 **Flexible Layout**: Support for custom spacing with `columnGap` prop

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

### Simple Calendar

```tsx
import { StripCalendar } from 'react-native-strip-calendar';

export default function MyComponent() {
  return (
    <StripCalendar
      startDate={new Date('2025-01-01')}
      endDate={new Date('2025-12-31')}
      initialDate={new Date()}
      onDateChange={(date) => console.log('Selected date:', date)}
    >
      <StripCalendar.Header>
        {(dateString) => <Text>{dateString}</Text>}
      </StripCalendar.Header>
      <StripCalendar.Week />
      <StripCalendar.PreviousButton>
        {({ disabled }) => <Button disabled={disabled}>Previous</Button>}
      </StripCalendar.PreviousButton>
      <StripCalendar.NextButton>
        {({ disabled }) => <Button disabled={disabled}>Next</Button>}
      </StripCalendar.NextButton>
    </StripCalendar>
  );
}
```

### With Custom Day Styling (using dayProps)

```tsx
<StripCalendar
  startDate={new Date('2025-01-01')}
  endDate={new Date('2025-12-31')}
  initialDate={new Date()}
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  markedDates={['2025-01-15', '2025-02-14', '2025-03-08']}
  containerHeight={120}
  itemWidth={48}
>
  <StripCalendar.Header>
    {(dateString) => (
      <Text style={styles.header}>
        {format(new Date(dateString), 'MMMM yyyy')}
      </Text>
    )}
  </StripCalendar.Header>
  <StripCalendar.Week
    columnGap={16}
    dayProps={{
      styles: {
        base: {
          container: {
            width: 48,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: '#f0f0f0',
            marginHorizontal: 1,
            marginVertical: 1,
          },
          dayName: {
            fontSize: 9,
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: 2,
          },
          dayNumber: {
            fontSize: 16,
            color: '#374151',
            fontWeight: '600',
          },
        },
        today: {
          container: {
            backgroundColor: '#dbeafe',
            borderWidth: 2,
            borderColor: '#3b82f6',
          },
        },
        selected: {
          container: {
            backgroundColor: '#3b82f6',
          },
          dayNumber: {
            color: '#ffffff',
          },
        },
      },
    }}
  />
  <StripCalendar.PreviousButton>
    {({ disabled }) => (
      <Pressable
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text>‹</Text>
      </Pressable>
    )}
  </StripCalendar.PreviousButton>
  <StripCalendar.NextButton>
    {({ disabled }) => (
      <Pressable
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text>›</Text>
      </Pressable>
    )}
  </StripCalendar.NextButton>
</StripCalendar>
```

### With Custom Day Renderer (using renderDay)

```tsx
<StripCalendar
  startDate={new Date('2025-01-01')}
  endDate={new Date('2025-12-31')}
  initialDate={new Date()}
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  markedDates={['2025-01-15', '2025-02-14', '2025-03-08']}
  containerHeight={120}
  itemWidth={48}
>
  <StripCalendar.Header>
    {(dateString) => (
      <Text style={styles.header}>
        {format(new Date(dateString), 'MMMM yyyy')}
      </Text>
    )}
  </StripCalendar.Header>
  <StripCalendar.Week
    columnGap={16}
    renderDay={({
      date,
      isSelected,
      isDisabled,
      isMarked,
      dayName,
      dayNumber,
      onPress,
    }) => (
      <Pressable
        style={[
          styles.customDay,
          isSelected && styles.selectedDay,
          isMarked && styles.markedDay,
          isDisabled && styles.disabledDay,
        ]}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text style={styles.dayName}>{dayName}</Text>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
        {isMarked && <View style={styles.indicator} />}
      </Pressable>
    )}
  />
  <StripCalendar.PreviousButton>
    {({ disabled }) => (
      <Pressable
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text>‹</Text>
      </Pressable>
    )}
  </StripCalendar.PreviousButton>
  <StripCalendar.NextButton>
    {({ disabled }) => (
      <Pressable
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text>›</Text>
      </Pressable>
    )}
  </StripCalendar.NextButton>
</StripCalendar>
```

## Props

### StripCalendarProps

| Prop              | Type                     | Default      | Description                                    |
| ----------------- | ------------------------ | ------------ | ---------------------------------------------- |
| `initialDate`     | `Date`                   | `new Date()` | Initial date to display                        |
| `firstDay`        | `Day`                    | `1`          | First day of the week (0 = Sunday, 1 = Monday) |
| `startDate`       | `Date`                   | `undefined`  | Start date of the calendar range               |
| `endDate`         | `Date`                   | `undefined`  | End date of the calendar range                 |
| `minDate`         | `Date`                   | `undefined`  | Minimum selectable date                        |
| `maxDate`         | `Date`                   | `undefined`  | Maximum selectable date                        |
| `selectedDate`    | `string`                 | `undefined`  | Currently selected date (YYYY-MM-DD format)    |
| `onDateChange`    | `(date: string) => void` | `undefined`  | Callback when date is selected                 |
| `containerHeight` | `number`                 | `60`         | Height of the calendar container               |
| `itemWidth`       | `number`                 | `48`         | Width of each day item                         |
| `markedDates`     | `string[]`               | `[]`         | Array of dates to mark (YYYY-MM-DD format)     |
| `classNames`      | `string`                 | `undefined`  | CSS class names for styling (NativeWind)       |
| `styles`          | `StyleProp<ViewStyle>`   | `undefined`  | StyleSheet styles for styling                  |
| `locale`          | `Locale`                 | `enUS`       | Locale for date formatting                     |

### StripCalendar.Week Props

| Prop              | Type                   | Description                              |
| ----------------- | ---------------------- | ---------------------------------------- |
| `dayProps`        | `DayProps`             | Props for the Day component              |
| `renderDay`       | `(props) => ReactNode` | Custom day renderer function             |
| `className`       | `object`               | CSS class names for container and week   |
| `style`           | `object`               | StyleSheet styles for container and week |
| `columnGap`       | `number`               | Gap between week columns (default: 12)   |
| `containerHeight` | `number`               | Height of the week container             |

**Note:** When `renderDay` is provided, `dayProps` are ignored. Use either `dayProps` for styling the default Day component or `renderDay` for completely custom day rendering.

### DayProps

| Prop           | Type                   | Description                                   |
| -------------- | ---------------------- | --------------------------------------------- |
| `date`         | `CalendarDate`         | The date object to render                     |
| `classNames`   | `DayStateClassNames`   | CSS class names for different day states      |
| `styles`       | `DayStateStyles`       | StyleSheet styles for different day states    |
| `formatString` | `object`               | Custom format strings for day name and number |
| `renderDay`    | `(props) => ReactNode` | Custom day renderer function                  |

## Compound Components

### StripCalendar.Header

Renders the calendar header with the selected date.

```tsx
<StripCalendar.Header>
  {(dateString) => (
    <Text style={styles.header}>
      {format(new Date(dateString), 'MMMM yyyy')}
    </Text>
  )}
</StripCalendar.Header>
```

### StripCalendar.Week

Renders the week view with days. Supports two approaches:

#### Using dayProps (Default Day Component)

```tsx
<StripCalendar.Week
  columnGap={16}
  className={{
    container: 'list-container',
    week: 'week-item',
  }}
  style={{
    container: { padding: 16 },
    week: { marginBottom: 8 },
  }}
  dayProps={{
    styles: {
      base: {
        container: styles.dayContainer,
        dayName: styles.dayName,
        dayNumber: styles.dayNumber,
      },
      today: {
        container: styles.todayContainer,
      },
      selected: {
        container: styles.selectedContainer,
      },
    },
  }}
/>
```

#### Using renderDay (Custom Day Component)

```tsx
<StripCalendar.Week
  columnGap={16}
  className={{
    container: 'list-container',
    week: 'week-item',
  }}
  style={{
    container: { padding: 16 },
    week: { marginBottom: 8 },
  }}
  renderDay={({
    date,
    isSelected,
    isDisabled,
    isMarked,
    dayName,
    dayNumber,
    onPress,
  }) => (
    <Pressable
      style={[
        styles.customDay,
        isSelected && styles.selectedDay,
        isMarked && styles.markedDay,
        isDisabled && styles.disabledDay,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.dayName}>{dayName}</Text>
      <Text style={styles.dayNumber}>{dayNumber}</Text>
      {isMarked && <View style={styles.indicator} />}
    </Pressable>
  )}
/>
```

### StripCalendar.Day

Renders a single day (useful for custom layouts).

```tsx
<StripCalendar.Day
  date={dateObject}
  styles={customDayStyles}
  classNames={customDayClassNames}
/>
```

## Styling

### StyleSheet Approach

```tsx
import { StyleSheet } from 'react-native';

<StripCalendar containerHeight={120} itemWidth={48}>
  <StripCalendar.Week
    columnGap={16}
    dayProps={{
      styles: {
        base: {
          container: styles.dayContainer,
          dayName: styles.dayName,
          dayNumber: styles.dayNumber,
        },
        today: {
          container: styles.todayContainer,
        },
        selected: {
          container: styles.selectedContainer,
        },
      },
    }}
  />
</StripCalendar>;

const styles = StyleSheet.create({
  dayContainer: {
    width: 48,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 1,
    marginVertical: 1,
  },
  dayName: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  dayNumber: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  todayContainer: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  selectedContainer: {
    backgroundColor: '#3b82f6',
  },
});
```

### NativeWind/ClassName Approach

```tsx
<StripCalendar containerHeight={120} itemWidth={48}>
  <StripCalendar.Week
    columnGap={16}
    dayProps={{
      classNames: {
        base: {
          container:
            'w-12 h-15 items-center justify-center rounded-xl bg-gray-100 mx-0.5 my-0.5',
          dayName: 'text-xs text-gray-500 font-medium mb-0.5',
          dayNumber: 'text-base text-gray-700 font-semibold',
        },
        today: {
          container: 'bg-blue-100 border-2 border-blue-500',
        },
        selected: {
          container: 'bg-blue-500',
          dayNumber: 'text-white',
        },
      },
    }}
  />
</StripCalendar>
```

## Custom Rendering

### Custom Day Renderer

```tsx
<StripCalendar containerHeight={120} itemWidth={48}>
  <StripCalendar.Week
    columnGap={16}
    renderDay={({
      date,
      isSelected,
      isDisabled,
      isMarked,
      dayName,
      dayNumber,
      onPress,
    }) => (
      <Pressable
        style={[
          styles.customDay,
          isSelected && styles.selectedDay,
          isMarked && styles.markedDay,
          isDisabled && styles.disabledDay,
        ]}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text style={styles.dayName}>{dayName}</Text>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
        {isMarked && <View style={styles.indicator} />}
      </Pressable>
    )}
  />
</StripCalendar>
```

## Hooks

### useHorizontalCalendar

A custom hook that provides calendar state and navigation logic:

```tsx
import { useHorizontalCalendar } from 'react-native-strip-calendar';

const {
  weeksData,
  selectedDate,
  currentScrollIndex,
  initialScrollIndex,
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
