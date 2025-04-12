import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { COLORS, FONTS } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ThemeBtn from '../components/ThemeBtn';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../redux/actions/drawerAction';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustmerFormat } from '../core/tools';
import { getForCustomer } from '../core/http';

const MenuItems = [
  { icon: IMAGES.home, key: 'home', navigate: 'DrawerNavigation' },
  { icon: IMAGES.user3, key: 'profile', navigate: 'Profile' },
  { icon: IMAGES.logout, key: 'logout', navigate: 'SignIn' },
];

const DrawerMenu = () => {
  
  const theme = useTheme();
  const dispatch = useDispatch();

  const { colors }: { colors: any } = theme;

  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? COLORS.title : colors.card,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
      
      </View>
    </ScrollView>
  );
};

export default DrawerMenu;