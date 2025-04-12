import React from 'react';
import { useTheme } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BasicBarChart = () => {
  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return (
    <>
      <BarChart
        data={data}
        width={SIZES.width - 60}
        height={220}
        yAxisLabel=""
        fromZero={true}
        chartConfig={{
          backgroundColor: '#FFFFFF',         // Set background to white
          backgroundGradientFrom: '#FFFFFF',  // Set gradient start to white
          backgroundGradientTo: '#FFFFFF',    // Set gradient end to white
          fillShadowGradientFrom: COLORS.primary,
          fillShadowGradientFromOpacity: 0.35,
          fillShadowGradientTo: COLORS.primary,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => COLORS.primary,
          labelColor: () => colors.text,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff"
          },
          propsForBackgroundLines: {
            stroke: colors.text,
            strokeOpacity: 0.3,
          }
        }}
        verticalLabelRotation={0}
      />
    </>
  );
};

export default BasicBarChart;