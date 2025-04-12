import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';

const BasicPieChart = () => {
  const { colors } = useTheme();

  const data = [
    {
      name: "D. Marketing digital",
      population: 2100000,
      color: "#1B5E20", // Dark Forest Green
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "D. strategique",
      population: 2800000,
      color: "#4CAF50", // Medium Green
      legendFontColor: colors.text,
      legendFontSize: 12
    },
    {
      name: "Diagnostic operationnel",
      population: 4027612,
      color: "#A5D6A7", // Light Pale Green
      legendFontColor: colors.text,
      legendFontSize: 12
    }
  ];

  return (
    <PieChart
      data={data}
      width={SIZES.width - 60}
      height={200}
      chartConfig={{
        color: () => '#4CAF50', // Matches the medium green for consistency
        labelColor: () => colors.text,
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      center={[10, 6]}
    />
  );
};

export default BasicPieChart;