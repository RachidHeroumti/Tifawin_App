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
  StyleSheet,
  TextInput,
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
import RBSheet from 'react-native-raw-bottom-sheet'; 

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation}: ProfileScreenProps) => {
  const {translations, language} = useSelector(
    (state: any) => state.languageTracker,
  );
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const dispatch = useDispatch();
  const questionSheetRef = useRef<any>(null); 

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');

  const settingsOptions = [
    {id: 1, title: 'Account', icon: 'user', screen: 'AccountSettings'},
    {id: 2, title: 'Notifications', icon: 'bell', screen: 'NotificationSettings'},
    {id: 3, title: 'Privacy', icon: 'lock', screen: 'PrivacySettings'},
    {
      id: 7,
      title: 'Questions',
      icon: 'plus-square',
      action: () => questionSheetRef.current.open(), 
    },
    {id: 4, title: 'Language', icon: 'globe', screen: 'LanguageSettings'},
    {id: 5, title: 'Appearance', icon: 'eye', screen: 'AppearanceSettings'},
    {id: 6, title: 'Help & Support', icon: 'help-circle', screen: 'Help'},
  ];

  
  const handleAddQuestion = () => {
    console.log('Question:', questionText, 'Type:', questionType);
    setQuestionText(''); 
    questionSheetRef.current.close();
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary]}
        style={styles.header}>
        <View style={[GlobalStyleSheet.container, styles.headerContainer]}>
          <View style={styles.topbar}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => dispatch(openDrawer())}
              style={[GlobalStyleSheet.background3, {backgroundColor: COLORS.card}]}>
              <Image style={GlobalStyleSheet.image2} source={IMAGES.grid6} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>

          
          <Image
            source={IMAGES.user2 || {uri: 'https://via.placeholder.com/80'}}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hassan Add</Text>
            <Text style={styles.profileEmail}>add.do@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <FeatherIcon name="edit-2" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          {settingsOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingsItem}
              onPress={
                item.action
                  ? item.action // For Questions, trigger the bottom sheet
                  : () => navigation.navigate(item.screen as any)
              }>
              <View style={styles.settingsIconContainer}>
                <FeatherIcon name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.settingsTitle}>{item.title}</Text>
              <FeatherIcon name="chevron-right" size={20} color={colors.text} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sheet for Adding a Question */}
      <RBSheet
        ref={questionSheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colors.card,
          },
        }}>
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Add a New Question</Text>

          {/* Question Text Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter your question"
            placeholderTextColor={COLORS.text}
            value={questionText}
            onChangeText={setQuestionText}
          />

          {/* Question Type Selection */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                questionType === 'Multiple Choice' && styles.typeButtonActive,
              ]}
              onPress={() => setQuestionType('Multiple Choice')}>
              <Text
                style={[
                  styles.typeButtonText,
                  questionType === 'Multiple Choice' && {color: COLORS.white},
                ]}>
                Multiple Choice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                questionType === 'Text' && styles.typeButtonActive,
              ]}
              onPress={() => setQuestionType('Text')}>
              <Text
                style={[
                  styles.typeButtonText,
                  questionType === 'Text' && {color: COLORS.white},
                ]}>
                Text
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddQuestion}>
            <Text style={styles.submitButtonText}>Add Question</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  // Existing styles remain unchanged...
  header: {
    height: 60,
    justifyContent: 'center',
  },
  headerContainer: {
    paddingHorizontal: 15,
    padding: 0,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: FONTS.medium,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...FONTS.fontMedium,
    fontSize: 18,
    color: COLORS.title,
  },
  profileEmail: {
    ...FONTS.font,
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  settingsContainer: {
    marginHorizontal: 15,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingsIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  settingsTitle: {
    ...FONTS.font,
    fontSize: 16,
    color: COLORS.title,
    flex: 1,
  },
  logoutButton: {
    margin: 15,
    backgroundColor: COLORS.danger,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    ...FONTS.fontMedium,
    fontSize: 16,
    color: 'white',
  },
  // New styles for the bottom sheet
  sheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    ...FONTS.fontMedium,
    fontSize: 18,
    color: COLORS.title,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: COLORS.title,
    marginBottom: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 5,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    ...FONTS.font,
    fontSize: 14,
    color: COLORS.title,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    ...FONTS.fontMedium,
    fontSize: 16,
    color: 'white',
  },
});

export default Profile;