import { cn } from '../../lib/cn';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface WeekProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function Week({ className, style, children }: WeekProps) {
  return (
    <View
      style={[defaultStyles.container, style]}
      className={cn('', className)}
    >
      {children}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
});
