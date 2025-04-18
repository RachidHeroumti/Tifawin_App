import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './BottomTabParamList';
import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import BottomMenu from '../layout/BottomMenu';
import Cooperative from '../screens/Cooperatives/Cooperative';
import Article from '../screens/Articles/Article';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomMenu {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} /> 
      <Tab.Screen name="Cooperative" component={Cooperative} />
      <Tab.Screen name="Article" component={Article} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
