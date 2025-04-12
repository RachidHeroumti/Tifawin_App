import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {IMAGES} from '../../constants/Images';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {StackScreenProps} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {openDrawer} from '../../redux/actions/drawerAction';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BasicBarChart from '../../components/Charts/BarChart';
import BasicPieChart from '../../components/Charts/PieChart';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from '../../core/http';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
const Home = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const moresheet2 = useRef<any>(null);


  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#fff', '#fff']}
          style={{
            height: 60,
            justifyContent: 'space-between',
            opacity: 80,
          }}>
          <View
            style={{
              height: 60,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 5,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={() => dispatch(openDrawer())}
              style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon color="#091e44" name="menu" size={22} />
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#091e44',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}>
                App Name
              </Text>
            </View>
        
          </View>
        </LinearGradient>
    
 
        <View style={{padding: 20}}></View>
      </ScrollView>
      
    </View>
  );
};
const styles = {
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  container: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    color: '#000',
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  profitCard: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  profitText: {
    color: '#000',
    fontSize: 16,
  },
  profitAmount: {
    color: '#845EC2',
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
};
export default Home;
