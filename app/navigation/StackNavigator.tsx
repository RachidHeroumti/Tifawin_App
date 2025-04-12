import React, {useEffect, useRef, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParamList';
import {StatusBar, View, Text,Platform,  Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import SignUp from '../screens/Auth/SignUp';
import SingIn from '../screens/Auth/SingIn';
import BottomNavigation from './BottomNavigation';
import DrawerNavigation from './DrawerNavigation';
import {post} from '../core/http';
import {useDispatch, useSelector} from 'react-redux';
import {setSettings} from '../redux/reducer/settingReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createStackNavigator<RootStackParamList>();
//xro@.1.App

const StackNavigator = () => {
  const dispatch = useDispatch();
  const theme = useTheme();


  return (
    <View style={{width: '100%', flex: 1}}>
      <Stack.Navigator
        initialRouteName="DrawerNavigation"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="SignUp" component={SignUp} />
      
        <Stack.Screen name="SingIn" component={SingIn} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        
      </Stack.Navigator>
    </View>
  );
};

export default StackNavigator;
