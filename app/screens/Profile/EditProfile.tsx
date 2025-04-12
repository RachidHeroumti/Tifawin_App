import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {COLORS, FONTS} from '../../constants/theme';
import {get, post} from '../../core/http';
import {useSelector} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {KeyboardAvoidingView} from 'react-native';

const EditProfile = () => {
  const {translations, language} = useSelector(
    (state: any) => state.languageTracker,
  );
  const userId = useSelector((state: any) => state.settings.user._id);
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const navigation = useNavigation<any>();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [user, setUserInfo] = useState();
  const [rib, setRib] = useState('');
  const [address, setAddress] = useState('');
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const getUserInfo = async () => {
    try {
      if (userId) {
        const res = await get(`/manager/api/users/me?id=${userId}`);
        setUserInfo(res.data.user);
        setFirstName(res.data.user?.firstname);
        setLastName(res.data.user?.lastname);
        setEmail(res.data.user?.email);
        setMobile(res.data.user?.phones[0].number);
        setRib(res.data.user?.rib);
        setAddress(res.data.user?.address);
      } else {
        console.log('User ID is not available');
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const SaveEdits = async () => {
    try {
      if (!firstname || !lastname || !email || !mobile) {
        Alert.alert('All fields are required. Please fill in all the details.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Please enter a valid email address.');
        return;
      }

      if (rib?.toString().length < 10) {
        Alert.alert('RIB must be at least 10 digits long.');
        return;
      }
      const PHONE_REGEX = /^\+?[0-9]\d{6,14}$/;
      if (!PHONE_REGEX.test(mobile)) {
        console.log("🚀 ~ SaveEdits ~ mobile:error format", mobile)
        // Alert.alert('Error', 'Please enter a valid phone number');
        // return;
      }
      const data = {
        firstname,
        lastname,
        email,
        address,
        rib,
      };

      const res = await post(
        `/manager/api/users/update/?id=${userId}`,
        {},
        data,
      );
      console.log('Profile updated:', res.data);

      navigation.navigate('DrawerNavigation');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'An error occurred while updating the profile. Please try again.',
      );
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await post(
        `/manager/api/users/update/?id=${userId}`,
        {},
        {currPassword: oldPassword, password: newPassword},
      );
      if (res.data) {
        Alert.alert('Success', 'Password changed successfully');
        setPasswordModalVisible(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        Alert.alert('Error', res.data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'An error occurred while changing password');
    }
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Header title={translations['editProfile']} leftIcon="back" titleLeft />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={[
              GlobalStyleSheet.container,
              {
                backgroundColor: theme.dark
                  ? 'rgba(255,255,255,.1)'
                  : colors.card,
                marginTop: 5,
                paddingVertical: 10,
              },
            ]}>
            <View style={{marginBottom: 10, marginTop: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.firstname}
              </Text>
              <Input
                onChangeText={value => setFirstName(value)}
                value={firstname}
                background={colors.card}
              />
            </View>

            <View style={{marginBottom: 10, marginTop: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.lastname}
              </Text>
              <Input
                onChangeText={value => setLastName(value)}
                value={lastname}
                background={colors.card}
              />
            </View>

            <View style={{marginBottom: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.mobilenumber}
              </Text>
              <Input
                onChangeText={value => setMobile(value)}
                value={mobile}
                background={colors.card}
                keyboardType={'number-pad'}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.email}
              </Text>
              <Input
                onChangeText={value => setEmail(value)}
                value={email}
                background={colors.card}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.address}
              </Text>
              <Input
                onChangeText={value => setAddress(value)}
                value={address}
                background={colors.card}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={[styles.InputTitle, {color: colors.title}]}>
                {translations.rib}
              </Text>
              <Input
                onChangeText={value => setRib(value)}
                value={rib}
                background={colors.card}
              />
            </View>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => setPasswordModalVisible(true)}>
              <FeatherIcon name="lock" size={20} color={COLORS.primary} />
              <Text style={styles.changePasswordText}>
                {translations['changePassword']}
              </Text>
            </TouchableOpacity>
          </View>
          <View
        style={[
          GlobalStyleSheet.container,
          {paddingHorizontal: 0, paddingBottom: 0},
        ]}>
        <View
          style={[
            styles.bottomBtn,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
            },
          ]}>
          <Button
            title={translations['editProfile']}
            color={COLORS.primary}
            text={COLORS.white}
            onPress={SaveEdits}
          />
        </View>
      </View>
        </ScrollView>
        
      </KeyboardAvoidingView>
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPasswordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {translations['changePassword']}
            </Text>
            <View style={styles.modalInputContainer}>
              <Text style={styles.modalInputLabel}>
                {translations['oldPassword']}
              </Text>
              <Input
                secureTextEntry
                onChangeText={setOldPassword}
                value={oldPassword}
                background={colors.card}
              />
            </View>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalInputLabel}>
                {translations['newPassword']}
              </Text>
              <Input
                secureTextEntry
                onChangeText={setNewPassword}
                value={newPassword}
                background={colors.card}
              />
            </View>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalInputLabel}>
                {translations['confirmNewPassword']}
              </Text>
              <Input
                secureTextEntry
                onChangeText={setConfirmNewPassword}
                value={confirmNewPassword}
                background={colors.card}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.modalCancelButtonText}>
                  {translations['cancel']}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleChangePassword}>
                <Text style={styles.modalConfirmButtonText}>
                  {translations['changePassword']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBtn: {
    height: 75,
    width: '100%',
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  changePasswordText: {
    color: COLORS.primary,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop:32
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  modalInputContainer: {
    marginBottom: 15,
  },
  modalInputLabel: {
    marginBottom: 5,
    color: COLORS.primary,
    fontSize: 14,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalConfirmButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default EditProfile;
