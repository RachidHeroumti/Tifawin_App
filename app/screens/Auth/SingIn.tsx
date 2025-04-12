import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {useTheme} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {post} from '../../core/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

type SingInScreenProps = StackScreenProps<RootStackParamList, 'SingIn'>;

  
const SingIn = ({navigation}: SingInScreenProps) => {
  const { translations, language } = useSelector((state: any) => state.languageTracker);
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const userData = {
      email: email,
      password: password,
    };
    console.log("🚀 ~ handleSignIn ~ userData:", userData)

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      userData.email,
    );
    if (userData) {
      try {
        const response = await post('/login', userData);
        console.log("🚀 ~ handleSignIn ~ response:", response.data.token)
        const token=response.data.token
        if(token){
            await AsyncStorage.setItem('token', token);
            navigation.navigate('DrawerNavigation', { screen: 'Home' });
        }

      } catch (error) {
        console.log("🚀 ~ handleSignIn ~ error:", error)
        Alert.alert('Error', 'Email or password not valid');
      }
    } else {
      Alert.alert('Error', 'Email or password not correct');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
      <View style={[GlobalStyleSheet.container, {paddingVertical: 20}]}>
        <View style={[GlobalStyleSheet.flex]}>
          <TouchableOpacity
            onPress={() =>  navigation.navigate('DrawerNavigation', { screen: 'Home' })}
            style={[
              GlobalStyleSheet.background2,
              {backgroundColor: colors.border},
            ]}>
            <FeatherIcon size={24} color={colors.title} name={'chevron-left'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DrawerNavigation', {screen: 'Home'})
            }>
            <Text style={styles.text}>{translations.skip}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          GlobalStyleSheet.border,
          {flex: 1, borderColor: colors.border},
        ]}>
        <View style={[GlobalStyleSheet.container, {flexGrow: 1, marginTop: 5}]}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={[styles.title1, {color: colors.title}]}>
                 {translations.sign_in_to_account}
              </Text>
              <Text style={[styles.title2, {color: colors.text}]}>
                {translations.welcome_back_missed}
              </Text>
            </View>
            <View style={{marginBottom: 10, marginTop: 20}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.email}
              </Text>
              <Input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                backround={colors.card}
                onChangeText={value => setEmail(value)}
                isFocused={isFocused}
                value={email}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.password}
              </Text>
              <Input
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                backround={colors.card}
                onChangeText={value => setPassword(value)}
                isFocused={isFocused2}
                type={'password'}
                secureTextEntry={true}
                value={password}
              />
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('OTPAuthentication')}>
              <Text style={styles.text2}>{translations.forget_password}</Text>
            </TouchableOpacity> */}
          </ScrollView>
          <View>
            <Button color='#091e44' title={translations.sign_in} onPress={handleSignIn} />
          </View>
          {/* <View style={{marginTop: 10}}>
            <SocialBtn
              rounded
              icon={
                <Image
                  style={GlobalStyleSheet.image2}
                  source={IMAGES.google2}
                />
              }
              text={'Sign in with google'}
              color={theme.dark ? COLORS.title : COLORS.borderColor}
            />
          </View>
          <View style={{marginTop: 10}}>
            <SocialBtn
              rounded
              icon={<FontAwesome name="apple" size={20} color={colors.title} />}
              text={'Sign in with Apple'}
              color={theme.dark ? COLORS.title : COLORS.borderColor}
            />
          </View> */}
          <View style={[GlobalStyleSheet.bottombtn]}>
            <Text
              style={[FONTS.fontRegular, {fontSize: 15, color: colors.title}]}>
              {translations.not_member}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.title4}>{translations.create_account}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    ...FONTS.fontRegular,
    fontSize: 16,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  text2: {
    ...FONTS.fontRegular,
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: 10,
  },
  image1: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 20,
    zIndex: -1,
  },
  image2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1.2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  title1: {
    ...FONTS.fontMedium,
    fontSize: 20,
    color: COLORS.title,
    marginBottom: 5,
  },
  title2: {
    ...FONTS.fontRegular,
    fontSize: 15,
    color: COLORS.text,
  },
  title3: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.title,
    marginBottom: 5,
  },
  title4: {
    ...FONTS.fontRegular,
    fontSize: 15,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
});

export default SingIn;
