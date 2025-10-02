import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { StripCalendar } from 'react-native-strip-calendar';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <StripCalendar
          startDate={new Date('2025-01-01')}
          endDate={new Date('2025-12-31')}
          initialDate={new Date()}
        />
      </Container>
    </>
  );
}
