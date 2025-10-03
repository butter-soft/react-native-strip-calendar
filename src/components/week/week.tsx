import { cn } from '../../lib/cn';
import { useStripCalendarContext } from '../context';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface WeekProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function Week({ className, style, children }: WeekProps) {
  const { itemWidth } = useStripCalendarContext();

  return (
    <View
      style={[defaultStyles.container, { width: itemWidth * 7 }, style]}
      className={cn('', className)}
    >
      {children}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
