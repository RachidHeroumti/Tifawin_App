import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
} from 'react-native';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IMAGES} from '../../constants/Images';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {useDispatch, useSelector} from 'react-redux';
import {openDrawer} from '../../redux/actions/drawerAction';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getForCustomer} from '../../core/http';
import { CustmerFormat } from '../../core/tools';
// import { LinearGradient } from 'expo-linear-gradient';

const btnData = [
  {
    title: 'Your order',
    navigate: 'Myorder',
    key:'my_orders'
  },
  {
    title: 'Wishlist',
    navigate: 'Wishlist',
    key:'my_wishlist'
  },
  // {
  //   title: 'Coupons',
  //   navigate: 'Coupons',
  //   key:'coupons'
  // },
//   {
//     title: 'Track order',
//     navigate: 'Trackorder',
//   },
];

const ListwithiconData = [
  {
    title: 'Account Settings',
    data: [
      {
        icon: IMAGES.user3,
        title: 'Edit profile',
        navigate: 'EditProfile',
        key:'edit_profile'
      },
      {
        icon: IMAGES.translation,
        title: 'Select Language',
        navigate: 'Language',
        key:'select_language'
      },
      {
        icon: IMAGES.ball,
        title: 'Notifications Settings',
        navigate: 'Notification',
        key:'notification_settings'
      },
    ],
  },

];

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation}: ProfileScreenProps) => {
  const { translations, language } = useSelector((state: any) => state.languageTracker);
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const [customerToken, setCustomerToken] = useState('');
  const [userInfo, setUserInfo] = useState<CustmerFormat>();

  //const navigation = useNavigation();
  const dispatch = useDispatch();
  const moresheet2 = useRef<any>(null);
  const getToken = async () => {
    let storedToken = await AsyncStorage.getItem('token');

    if (!storedToken || storedToken === null) {
      navigation.navigate('SingIn');
      return ;
    } else {
      setCustomerToken(storedToken);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getToken();
    }, [navigation]),
  );

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getForCustomer('/customers/me', {}, customerToken);
        setUserInfo(res.data);
      } catch (error) {
        setCustomerToken('')
        console.log('🚀 ~ getUserInfo ~ error : ', error);
      }
    };
    if (customerToken) {
      getUserInfo();
    }
  }, [customerToken]);

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <LinearGradient
        colors={[colors.primary, colors.primary]}
        style={{height: 60, justifyContent: 'center'}}>
        <View
          style={[
            GlobalStyleSheet.container,
            {paddingHorizontal: 15, padding: 0},
          ]}>
          <View style={[GlobalStyleSheet.flex]}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => dispatch(openDrawer())}
              style={[
                GlobalStyleSheet.background3,
                {backgroundColor: COLORS.card},
              ]}>
              <Image style={GlobalStyleSheet.image2} source={IMAGES.grid6} />
            </TouchableOpacity>
            <View>
              <Image
                style={{height: 25, resizeMode: 'contain'}}
                source={IMAGES.appname}
              />
            </View>
            <TouchableOpacity
             
              activeOpacity={0.5}
              style={[
                GlobalStyleSheet.background3,
                {backgroundColor: COLORS.card},
              ]}>
              <Image
                style={GlobalStyleSheet.image2}
                source={IMAGES.shoppingbag}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View
        style={[
          GlobalStyleSheet.container,
          {
            paddingTop: 20,
            backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card,
          },
        ]}>
        <View style={styles.topbar}>
          <Image style={styles.topbarimg} source={IMAGES.small6} />
          <Text
            style={{...FONTS.fontMedium, fontSize: 18, color: colors.title}}>
            {userInfo?.firstname} {userInfo?.lastname}
          </Text>
        
        </View>

        <View style={GlobalStyleSheet.row}>
          {btnData.map((data: any, index) => {
            return (
              <View
                key={index}
                style={[
                  GlobalStyleSheet.col50,
                  {marginBottom: 5, paddingHorizontal: 2.5},
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(data.navigate)}
                  style={[
                    styles.topbarbtn,
                    {
                      backgroundColor: colors.card,
                    },
                  ]}>
                  <Text
                    style={[
                      FONTS.fontMedium,
                      {fontSize: 16, color: colors.title},
                    ]}>
                    {translations[data.key]}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View style={[GlobalStyleSheet.container, {flex: 1, paddingTop: 0}]}>
        <View style={{marginHorizontal: -15, marginTop: 0, flex: 1}}>
          <SectionList
            sections={ListwithiconData}
            keyExtractor={(item: any, index) => item + index}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.navigate)}
                style={[
                  styles.sectioncard,
                  {
                    backgroundColor: theme.dark
                      ? 'rgba(255,255,255,.1)'
                      : colors.card,
                  },
                ]}>
                <View style={styles.sectionimg}>
                  <Image
                    style={[GlobalStyleSheet.image2, {tintColor: colors.title}]}
                    source={item.icon}
                  />
                </View>
                <Text
                  style={{
                    ...FONTS.fontRegular,
                    fontSize: 15,
                    color: colors.title,
                    flex: 1,
                  }}>
                  {translations[item.key]}
                </Text>
                <FeatherIcon
                  size={22}
                  color={colors.title}
                  name={'chevron-right'}
                />
              </TouchableOpacity>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.title,
                    backgroundColor: theme.dark
                      ? 'rgba(255,255,255,.1)'
                      : COLORS.white,
                  },
                ]}>
                {translations['account_settings']}
              </Text>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 20,
  },
  topbarimg: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  topbarbtn: {
    height: 48,
    width: '100%',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectioncard: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 48,
    alignItems: 'center',
  },
  sectionimg: {
    height: 30,
    width: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    ...FONTS.fontMedium,
    fontSize: 18,
    color: COLORS.title,
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    marginTop: 8,
  },
});

export default Profile;
