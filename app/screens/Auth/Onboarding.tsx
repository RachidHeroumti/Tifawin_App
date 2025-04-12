import React, { useRef, useState } from 'react';
import { Text, View,Image,  ScrollView,Animated, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS,FONTS, SIZES } from '../../constants/theme';;



type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({navigation} : OnboardingScreenProps) => {

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

  return (
    <SafeAreaView style={{flex:1,backgroundColor: colors.card,}}>
       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text:{
        ...FONTS.fontRegular,
        fontSize:16,
        color:COLORS.primary,
        textDecorationLine:'underline'
    },
    image1:{
        width:'100%',
        height:undefined,
        aspectRatio:1/1,
        borderRadius:20,
        zIndex:-1
    },
    image2:{
        width:'100%',
        height:undefined,
        aspectRatio:1/1.2,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        resizeMode:'contain'
    },
    title1:{
        ...FONTS.fontMedium,
        fontSize:28,
        textAlign:'center',
        color:COLORS.title,
        paddingHorizontal:30
    },
    title2:{
        ...FONTS.fontRegular,
        fontSize:16,
        textAlign:'center',
        color:COLORS.text,
        paddingHorizontal:25,
        marginTop:5
    }

})

export default Onboarding