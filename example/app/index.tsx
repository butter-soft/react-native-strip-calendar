import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { StripCalendar } from 'react-native-strip-calendar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('2025-10-18');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={styles.container}>
          <Text style={styles.title}>📅 Strip Calendar Example</Text>
          <StripCalendar
            startDate={new Date('2025-01-01')}
            endDate={new Date('2025-12-31')}
            maxDate={new Date('2025-10-31')}
            initialDate={new Date()}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            markedDates={['2025-10-15', '2025-10-18']}
            containerHeight={77}>
            <StripCalendar.Week
              columnGap={8}
              containerHeight={80}
              style={{
                week: {
                  width: 'auto',
                  columnGap: 8,
                },
              }}
              dayProps={{
                styles: {
                  base: {
                    container: {
                      width: 37,
                      height: 77,
                      paddingTop: 8,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    },
                    dayName: {
                      fontFamily: 'Pretendard',
                      fontSize: 12,
                      color: '#6b7280',
                      fontWeight: '500',
                      marginBottom: 2,
                    },
                    dayNumber: {
                      fontFamily: 'Pretendard',
                      fontSize: 14,
                      color: '#CFCFD2',
                      fontWeight: '600',
                      borderRadius: 180,
                      paddingTop: 8,
                      width: 37,
                      height: 49,
                      lineHeight: 20,
                      textAlign: 'center',
                    },
                    indicator: {
                      width: 4,
                      height: 4,
                      backgroundColor: '#0BC19C',
                      borderRadius: 180,
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: [{ translateX: '-50%' }],
                    },
                  },
                  today: {
                    dayNumber: {
                      backgroundColor: '#3C3B3E',
                      color: '#FEFEFF',
                      fontWeight: '700',
                    },
                    indicator: {
                      backgroundColor: '#FEFEFF',
                    },
                  },
                  selected: {
                    dayNumber: {
                      color: '#ffffff',
                      fontWeight: '700',
                      backgroundColor: '#0A7B69',
                    },
                    indicator: {
                      backgroundColor: '#FEFEFF',
                    },
                  },
                  disabled: {
                    dayNumber: {
                      color: '#434347',
                    },
                  },
                },
              }}
            />
          </StripCalendar>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'white',
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
    display: 'flex',
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
    fontSize: 24,
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
    backgroundColor: '#111',
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
    color: 'white',
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
