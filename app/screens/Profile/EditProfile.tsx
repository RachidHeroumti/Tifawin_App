import React, { useEffect, useState } from 'react'
import { View, Text,  ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';

import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';
import { getForCustomer, postForCustomer } from '../../core/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustmerFormat } from '../../core/tools';
import { useSelector } from 'react-redux';

const EditProfile = () => {
    
  const { translations, language } = useSelector((state: any) => state.languageTracker);
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const navigation = useNavigation<any>();

    const [customerToken, setCustomerToken] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const[userId,setUserId]=useState('')
    const [userInfo, setUserInfo] = useState<CustmerFormat>();

    const getToken = async () => {
        let storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
            console.log('🚀 ~ getToken ~ storedToken:', storedToken);
            navigation.navigate('SignUp');
        } else {
            setCustomerToken(storedToken);
        }
    };
    useEffect(()=>{
        getToken();
    })

      useEffect(() => {
        const getUserInfo = async () => {
          try {
            const res = await getForCustomer('/customers/me', {}, customerToken);
            setUserInfo(res.data);
            setFirstName(res.data.firstname);
            setLastName(res.data.lastname);
            setEmail(res.data.email);
            setMobile(res.data.phone)
            setUserId(res.data._id)
          } catch (error) {
            console.log('🚀 ~ getUserInfo ~ error : ', error);
          }
        };
        if (customerToken != '') {
          getUserInfo();
        }
      }, [customerToken]);


    const SaveEdits = async () => {

        try {
            const data = {
                firstname,
                lastname,
                email,
                phone:mobile ,
            };
            const res = await postForCustomer(`/customers/update/${userId}`, data, customerToken);
            console.log('Profile updated:', res.data);
            navigation.navigate('DrawerNavigation');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header title="Edit Profile" leftIcon="back" titleLeft />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[GlobalStyleSheet.container, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card }]}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <View>
                            <View style={styles.imageborder}>
                                <Image style={{ height: 82, width: 82, borderRadius: 50 }} source={IMAGES.small6} />
                            </View>
                            <TouchableOpacity style={[styles.WriteIconBackground, { backgroundColor: colors.card }]}>
                                <View style={styles.WriteIcon}>
                                    <Image style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: COLORS.card }} source={IMAGES.write} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={[FONTS.fontMedium, { fontSize: 24, color: colors.title }]}>James Smith</Text>
                            <Text style={[FONTS.fontMedium, { fontSize: 13, color: colors.text }]}>Last Visit : 17 Jan 2024</Text>
                        </View>
                    </View> */}
                </View>
                <View style={[GlobalStyleSheet.container, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, marginTop: 5, paddingVertical: 10 }]}>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={[styles.InputTitle, { color: colors.title }]}>{translations.firstname}</Text>
                        <Input onChangeText={(value) => setFirstName(value)} value={firstname} background={colors.card} />
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={[styles.InputTitle, { color: colors.title }]}>{translations.lastname}</Text>
                        <Input onChangeText={(value) => setLastName(value)} value={lastname} background={colors.card} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.InputTitle, { color: colors.title }]}>{translations.mobilenumber}</Text>
                        <Input onChangeText={(value) => setMobile(value)} value={mobile} background={colors.card} keyboardType={'number-pad'} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.InputTitle, { color: colors.title }]}>{translations.email}</Text>
                        <Input onChangeText={(value) => setEmail(value)} value={email} background={colors.card} />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 0, paddingBottom: 0 }]}>
                <View style={[styles.bottomBtn, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card }]}>
                    <Button title="Update Profile" color={COLORS.primary} text={COLORS.title} onPress={SaveEdits} />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    imageborder:{
        borderWidth: 2, 
        borderColor:COLORS.primary, 
        height: 90,
        width: 90, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    WriteIconBackground:{
        height: 42, 
        width: 42, 
        borderRadius: 40, 
        backgroundColor: COLORS.card, 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        bottom: 0, 
        left:60
    },
    WriteIcon:{
        height: 36, 
        width: 36, 
        borderRadius: 36, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:COLORS.primary 
    },
    InputTitle:{
        ...FONTS.fontMedium, 
        fontSize: 13, 
        color:COLORS.title,
        marginBottom:5
    },
    bottomBtn:{
        height:75,
        width:'100%',
        backgroundColor:COLORS.card,
        justifyContent:'center',
        paddingHorizontal:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: .1,
        shadowRadius: 5,
    }
})


export default EditProfile