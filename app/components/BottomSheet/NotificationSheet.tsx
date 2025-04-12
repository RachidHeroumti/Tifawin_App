import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';;
//import { Ionicons } from '@expo/vector-icons';


type Props = {
    moresheet2 ?: any;
}

const NotificationSheet = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <View style={[GlobalStyleSheet.container, { backgroundColor:theme.dark ? COLORS.title:COLORS.white,paddingTop:25 }]}>
           
        </View>
    )
}

export default NotificationSheet