import { cn } from '../../lib/cn';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type DayElementClassNames = {
  container?: string;
  dayName?: string;
  dayNumberContainer?: string;
  dayNumber?: string;
  indicator?: string;
};

export type DayElementStyles = {
  container?: StyleProp<ViewStyle>;
  dayName?: StyleProp<TextStyle>;
  dayNumberContainer?: StyleProp<ViewStyle>;
  dayNumber?: StyleProp<TextStyle>;
  indicator?: StyleProp<ViewStyle>;
};

export type DayStateClassNames = {
  base?: DayElementClassNames;
  today?: DayElementClassNames;
  selected?: DayElementClassNames;
  disabled?: DayElementClassNames;
};

export type DayStateStyles = {
  base?: DayElementStyles;
  today?: DayElementStyles;
  selected?: DayElementStyles;
  disabled?: DayElementStyles;
};

export const applyStateStyles = (
  baseStyle: DayElementStyles,
  stateStyles: {
    today?: DayElementStyles;
    selected?: DayElementStyles;
    disabled?: DayElementStyles;
  },
  states: {
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
  },
): DayElementStyles => {
  const { isToday, isSelected, isDisabled } = states;

  return {
    container: [
      baseStyle.container,
      isToday && stateStyles.today?.container,
      isSelected && stateStyles.selected?.container,
      isDisabled && stateStyles.disabled?.container,
    ].filter(Boolean),
    dayName: [
      baseStyle.dayName,
      isToday && stateStyles.today?.dayName,
      isSelected && stateStyles.selected?.dayName,
      isDisabled && stateStyles.disabled?.dayName,
    ].filter(Boolean),
    dayNumberContainer: [
      baseStyle.dayNumberContainer,
      isToday && stateStyles.today?.dayNumberContainer,
      isSelected && stateStyles.selected?.dayNumberContainer,
      isDisabled && stateStyles.disabled?.dayNumberContainer,
    ].filter(Boolean),
    dayNumber: [
      baseStyle.dayNumber,
      isToday && stateStyles.today?.dayNumber,
      isSelected && stateStyles.selected?.dayNumber,
      isDisabled && stateStyles.disabled?.dayNumber,
    ].filter(Boolean),
    indicator: [
      baseStyle.indicator,
      isToday && stateStyles.today?.indicator,
      isSelected && stateStyles.selected?.indicator,
      isDisabled && stateStyles.disabled?.indicator,
    ].filter(Boolean),
  };
};

export const applyStateClassNames = (
  baseClassName: DayElementClassNames,
  stateClassNames: {
    today?: DayElementClassNames;
    selected?: DayElementClassNames;
    disabled?: DayElementClassNames;
  },
  states: {
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
  },
): DayElementClassNames => {
  const { isToday, isSelected, isDisabled } = states;

  return {
    container: cn(
      baseClassName.container,
      isToday && stateClassNames.today?.container,
      isSelected && stateClassNames.selected?.container,
      isDisabled && stateClassNames.disabled?.container,
    ),
    dayName: cn(
      baseClassName.dayName,
      isToday && stateClassNames.today?.dayName,
      isSelected && stateClassNames.selected?.dayName,
      isDisabled && stateClassNames.disabled?.dayName,
    ),
    dayNumberContainer: cn(
      baseClassName.dayNumberContainer,
      isToday && stateClassNames.today?.dayNumberContainer,
      isSelected && stateClassNames.selected?.dayNumberContainer,
      isDisabled && stateClassNames.disabled?.dayNumberContainer,
    ),
    dayNumber: cn(
      baseClassName.dayNumber,
      isToday && stateClassNames.today?.dayNumber,
      isSelected && stateClassNames.selected?.dayNumber,
      isDisabled && stateClassNames.disabled?.dayNumber,
    ),
    indicator: cn(
      baseClassName.indicator,
      isToday && stateClassNames.today?.indicator,
      isSelected && stateClassNames.selected?.indicator,
      isDisabled && stateClassNames.disabled?.indicator,
    ),
  };
};
