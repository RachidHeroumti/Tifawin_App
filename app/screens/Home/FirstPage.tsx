import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import {useTheme} from '@react-navigation/native';
  import {COLORS, FONTS} from '../../constants/theme';
  import {StackScreenProps} from '@react-navigation/stack';
  import {RootStackParamList} from '../../navigation/RootStackParamList';
import { IMAGES } from '../../constants/Images';
  
  type FisrtPageScreenProps = StackScreenProps<RootStackParamList, 'FirstPage'>;
  
  const FisrtPage = ({navigation}: FisrtPageScreenProps) => {
    const theme = useTheme();
    const {colors} = theme;
  
    return (
      <View style={[styles.container, {backgroundColor: '#ffffff'}]}>
        {/* Title */}
        <Text style={styles.mainTitle}>
        Accompagner {'\n'}
        <Text style={styles.cooperativeText}>les coopératives</Text>{'\n'}
         vers la réussite{'\n'}
         
         
        </Text>
  
        {/* Illustration */}
        <Image
          source={IMAGES.img0} 
          style={styles.illustration}
          resizeMode="contain"
        />
  
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Recevez Une Analyse Personnalisée{'\n'}Pour Vous Aider À Grandir Durablement
        </Text>
  
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('SingIn')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#ffffff',
    },
    mainTitle: {
      fontSize: 34,
      fontWeight: '600',
      textAlign: 'center',
      color: '#1f2e1f',
      marginTop: 40,
    },
    cooperativeText: {
      color: '#446c44',
      fontWeight:'900',
      fontSize:36
    },
    illustration: {
      width: 250,
      height: 200,
      marginVertical: 30,
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'center',
      color: '#666666',
      marginBottom: 40,
    },
    buttonContainer: {
      width: '100%',
    },
    loginButton: {
      backgroundColor: '#3b573b',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    loginButtonText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: '600',
    },
    registerButton: {
      backgroundColor: '#b2c585',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
    },
    registerButtonText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: '600',
    },
  });
  
  export default FisrtPage;
  