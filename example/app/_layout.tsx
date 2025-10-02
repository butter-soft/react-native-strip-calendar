import { useUnistyles } from 'react-native-unistyles';

import { Stack } from 'expo-router';

export default function Layout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        headerTintColor: theme.colors.typography,
      }}
    />
  );
}
