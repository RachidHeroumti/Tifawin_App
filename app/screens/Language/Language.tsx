import {useNavigation, useTheme} from '@react-navigation/native';
import React, { useState } from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import {COLORS} from '../../constants/theme';
import {setLanguage} from '../../redux/reducer/languagesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Language = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const navigation = useNavigation<any>();
  const [selectedLg,setSelectedLg]=useState('')

  const handleLanguage = async (l: string) => {
    await AsyncStorage.setItem('language', l);
    dispatch(setLanguage(l));

  }; 

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <Header title="Language" leftIcon="back" titleLeft />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[GlobalStyleSheet.container, styles.contentContainer]}>
          <View style={[styles.inputBox, {borderColor: colors.border}]}>
            <Button
              title="English"
              onPress={() =>{ handleLanguage('EN');setSelectedLg('EN')}}
              style={styles.button}
            />
            <Button
              title="Français"
              onPress={() => {handleLanguage('FR');setSelectedLg('FR')}}
              style={styles.button}
            />
            <Button
              title="عربي"
              onPress={() =>{ handleLanguage('AR');setSelectedLg('AR')}}
              style={styles.button}
            />
          </View>

          <Button
            title="Save"
            color={COLORS.primary}
            text={COLORS.title}
            onPress={() => navigation.navigate('Profile')}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    marginTop: 15,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default Language;
