import {NavigatorScreenParams} from '@react-navigation/native';
import {BottomTabParamList} from './BottomTabParamList';

export type RootStackParamList = {
  DrawerNavigation: NavigatorScreenParams<BottomTabParamList>;
  Demo: undefined;
  SignUp: undefined;
  SingIn: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  BottomNavigation: undefined;
  EditProfile: undefined;
  Language: undefined;
  Home: undefined;
  BottomSheet: undefined;
  ModalBox: undefined;
  Buttons: undefined;
  Badges: undefined;
  Headers: undefined;
};
