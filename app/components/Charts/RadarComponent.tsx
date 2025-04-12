import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { RadarChart } from '@salmonco/react-native-radar-chart';

const RadarComponent = () => {
  // Define the data with full sentences and assign letters
  const fullData = [
    { sentence: 'communication', value: Math.floor(Math.random() * 101), letter: 'G1' },
    { sentence: 'identite de marque', value: Math.floor(Math.random() * 101), letter: 'G2' },
    { sentence: 'packaging', value: Math.floor(Math.random() * 101), letter: 'G3' },
    { sentence: 'strategie de prix', value: Math.floor(Math.random() * 101), letter: 'G4' },
    { sentence: 'distribution locale', value: Math.floor(Math.random() * 101), letter: 'G5' },
  ];

  // Data for the radar chart using only letters as labels
  const chartData = fullData.map(item => ({
    label: item.letter,
    value: item.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Radar Chart */}
      <RadarChart
        data={chartData}
        maxValue={100}
        gradientColor={{
          startColor: '#1B5E20', // Darker green
          endColor: '#E8F5E9',   // Very light green
          count: 5,             // Number of gradient steps
        }}
        stroke={['#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9', '#2E7D32']} // Distinct green shades
        strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
        strokeOpacity={[1, 1, 1, 1, 0.13]}
        labelColor="#1B5E20"      // Darker green for labels
        dataFillColor="#4CAF50"   // Medium green for fill
        dataFillOpacity={0.8}
        dataStroke="#2E7D32"      // Slightly darker green for data outline
        dataStrokeWidth={2}
        isCircle
      />

      {/* Legend at the Bottom */}
      <View style={styles.legendContainer}>
        {fullData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <Text style={styles.legendKey}>{item.letter} : </Text>
            <Text style={styles.legendText}>{item.sentence}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap',     // Allow items to wrap to the next line
    width: '100%',        // Ensure it takes full width of the container
  },
  legendItem: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10, // Add horizontal spacing between items
    maxWidth: '45%',     // Limit width so items wrap nicely (adjust as needed)
  },
  legendKey: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',    // Match the darker green theme
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#1B5E20',    // Darker green for readability
    flexShrink: 1,       // Allow text to shrink if needed
  },
});

export default RadarComponent;