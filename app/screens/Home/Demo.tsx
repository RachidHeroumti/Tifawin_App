import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {COLORS} from '../../constants/theme';

const Demo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: COLORS.title,
      }}></View>
  );
};

export default Demo;
