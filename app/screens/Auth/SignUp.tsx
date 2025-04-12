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
import {IMAGES} from '../../constants/Images';
import Button from '../../components/Button/Button';
import SelectCountery from '../../components/SelectCountery';
import {Checkbox} from 'react-native-paper';
import {get, post} from '../../core/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../layout/Header';

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: SignUpScreenProps) => {
  const { translations, language } = useSelector((state: any) => state.languageTracker);
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const [show, setShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phonNumber, setPhonNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !secondName || !email || !password || !confirmPassword||!phonNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }


    const userData = {
      firstname: firstName,
      lastname: secondName,
      email: email,
      phone: phonNumber,
      password: password,
    };
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      userData.email,
    );
    if (
      validEmail &&
      userData.email &&
      userData.firstname &&
      userData.lastname &&
      userData.password
    ) {
      try {
        const response = await post('/customers/create', userData);
        console.log('🚀 ~ handleSignUp ~ response:', response.data);
        const token = response.data.tokenCustomer;
        // let storedToken = await AsyncStorage.getItem('token');

        await AsyncStorage.setItem('token', token);
        if (token) {
          navigation.navigate('DrawerNavigation', {screen: 'Home'});
        }
      } catch (error) {
        console.error('error create account', error);
      }
    } else {
      Alert.alert('Error', 'Email or password not match the format');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
  
      <View style={[GlobalStyleSheet.container, {paddingVertical: 20}]}>
        
        <View style={[GlobalStyleSheet.flex]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
            <Text  style={styles.text}>{translations.skip}</Text>
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
              {translations.create_account}
              </Text>
              <Text style={[styles.title2, {color: colors.text}]}>
               {translations.welcome_back}
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.firstname}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Input
                backround={colors.card}
                onChangeText={value => setFirstName(value)}
                onFocus={() => setIsFocused3(true)}
                onBlur={() => setIsFocused3(false)}
                isFocused={isFocused3}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.lastname}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Input
                backround={colors.card}
                onChangeText={value => setSecondName(value)}
                onFocus={() => setIsFocused3(true)}
                onBlur={() => setIsFocused3(false)}
                isFocused={isFocused3}
              />
            </View>
            <View style={{marginBottom: 10, marginTop: 20, width: '100%'}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.mobilenumber}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View>
                  <SelectCountery />
                </View>
                <View style={{flex: 1}}>
                  <Input
                    backround={colors.card}
                    keyboardType="number-pad"
                    onChangeText={value => setPhonNumber(value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    isFocused={isFocused}
                  />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.email}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Input
                backround={colors.card}
                onChangeText={value => setEmail(value)}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                isFocused={isFocused2}
              />
            </View>

            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.password}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Input
                backround={colors.card}
                onChangeText={value => setPassword(value)}
                onFocus={() => setIsFocused4(true)}
                onBlur={() => setIsFocused4(false)}
                isFocused={isFocused4}
                type={'password'}
                secureTextEntry={show}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.title3, {color: colors.title}]}>
              {translations.confirm_password}<Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Input
                backround={colors.card}
                onChangeText={value => setConfirmPassword(value)}
                onFocus={() => setIsFocused4(true)}
                onBlur={() => setIsFocused4(false)}
                isFocused={isFocused4}
                type={'password'}
                secureTextEntry={show}
              />
            </View>
          </ScrollView>
          <View>
            <Button  color='#091e44' title={'Sign Up'} onPress={handleSignUp} />
          </View>
          <View
            style={[
              GlobalStyleSheet.flex,
              {justifyContent: 'center', gap: 5, marginTop: 10},
            ]}>
            <Text
              style={[FONTS.fontRegular, {fontSize: 15, color: colors.title}]}>
              {translations.already_have_account}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SingIn')}>
              <Text style={styles.title4}>{translations.sign_in}</Text>
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

export default SignUp;
