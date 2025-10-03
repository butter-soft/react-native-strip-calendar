import { Stack } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Container } from '@/components/Container';
import { StripCalendar } from 'react-native-strip-calendar';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <Stack.Screen options={{ title: 'Strip Calendar Example' }} />
      <Container>
        <View style={styles.container}>
          <Text style={styles.title}>Strip Calendar Example</Text>
          <StripCalendar
            startDate={new Date('2025-01-01')}
            endDate={new Date('2025-12-31')}
            initialDate={new Date()}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            markedDates={['2025-01-15', '2025-02-14', '2025-03-08']}
            dayProps={{
              styles: {
                base: {
                  container: {
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                  },
                  dayName: {
                    fontSize: 10,
                    color: '#6b7280',
                    fontWeight: '500',
                  },
                  dayNumber: {
                    fontSize: 14,
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
                  dayName: {
                    color: '#3b82f6',
                    fontWeight: '700',
                  },
                  dayNumber: {
                    color: '#3b82f6',
                    fontWeight: '700',
                  },
                },
                selected: {
                  container: {
                    backgroundColor: '#3b82f6',
                  },
                  dayName: {
                    color: '#ffffff',
                    fontWeight: '700',
                  },
                  dayNumber: {
                    color: '#ffffff',
                    fontWeight: '700',
                  },
                },
                disabled: {
                  container: {
                    opacity: 0.5,
                  },
                  dayName: {
                    color: '#9ca3af',
                  },
                  dayNumber: {
                    color: '#9ca3af',
                  },
                },
              },
            }}>
            <StripCalendar.Header>
              {(dateString) => (
                <Text style={styles.headerText}>
                  {new Date(dateString).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              )}
            </StripCalendar.Header>
            <StripCalendar.Navigation>
              <StripCalendar.PreviousButton>
                {({ disabled }) => (
                  <Text style={[styles.navButton, disabled && styles.disabledNavButton]}>
                    {disabled ? 'x' : '‹'}
                  </Text>
                )}
              </StripCalendar.PreviousButton>
              <StripCalendar.Week />
              <StripCalendar.NextButton>
                {({ disabled }) => (
                  <Text style={[styles.navButton, disabled && styles.disabledNavButton]}>
                    {disabled ? 'x' : '›'}
                  </Text>
                )}
              </StripCalendar.NextButton>
            </StripCalendar.Navigation>
          </StripCalendar>
          {selectedDate && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedText}>선택된 날짜: {selectedDate}</Text>
            </View>
          )}
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  navButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    padding: 8,
  },
  selectedInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  selectedText: {
    fontSize: 16,
    color: '#0369a1',
    textAlign: 'center',
  },
  disabledNavButton: {
    color: '#9ca3af',
  },
  disabledNavButtonText: {
    color: '#9ca3af',
  },
});
