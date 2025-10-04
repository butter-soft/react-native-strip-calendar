import { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { Container } from '@/components/Container';
import { StripCalendar } from 'react-native-strip-calendar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
      <Container>
        <View style={styles.container}>
          <Text style={styles.title}>📅 Strip Calendar Example</Text>
          <StripCalendar
            startDate={new Date('2025-01-01')}
            endDate={new Date('2025-12-31')}
            initialDate={new Date()}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            markedDates={['2025-01-15', '2025-02-14', '2025-03-08']}
            containerHeight={120}
            itemWidth={48}>
            <StripCalendar.Header>
              {(dateString) => (
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>
                    {new Date(dateString).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              )}
            </StripCalendar.Header>
            <StripCalendar.Week
              columnGap={16}
              style={{
                week: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                },
              }}
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
                      shadowColor: '#3b82f6',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
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
                      shadowColor: '#3b82f6',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                      elevation: 5,
                      transform: [{ scale: 1.05 }],
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
                      opacity: 0.4,
                      backgroundColor: '#f3f4f6',
                    },
                    dayName: {
                      color: '#9ca3af',
                    },
                    dayNumber: {
                      color: '#9ca3af',
                    },
                  },
                },
              }}
            />
            <View style={styles.navigationContainer}>
              <StripCalendar.PreviousButton>
                {({ disabled }) => (
                  <Pressable
                    style={[styles.navButton, disabled && styles.disabledNavButton]}
                    disabled={disabled}>
                    <Text style={[styles.navButtonText, disabled && styles.disabledNavButtonText]}>
                      ‹
                    </Text>
                  </Pressable>
                )}
              </StripCalendar.PreviousButton>
              <StripCalendar.NextButton>
                {({ disabled }) => (
                  <Pressable
                    style={[styles.navButton, disabled && styles.disabledNavButton]}
                    disabled={disabled}>
                    <Text style={[styles.navButtonText, disabled && styles.disabledNavButtonText]}>
                      ›
                    </Text>
                  </Pressable>
                )}
              </StripCalendar.NextButton>
            </View>
          </StripCalendar>
          {selectedDate && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>Selected Date</Text>
              <Text style={styles.selectedText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>✨ Features</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• Horizontal scrollable weekly calendar</Text>
              <Text style={styles.featureItem}>• Today&apos;s date highlighting</Text>
              <Text style={styles.featureItem}>• Selected date indication</Text>
              <Text style={styles.featureItem}>• Special date marking</Text>
              <Text style={styles.featureItem}>• Smooth animations</Text>
            </View>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1e293b',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  disabledNavButton: {
    backgroundColor: '#f8fafc',
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  disabledNavButtonText: {
    color: '#94a3b8',
  },
  selectedInfo: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
  },
  infoContainer: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
