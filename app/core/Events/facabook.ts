// import * as Facebook from 'expo-facebook';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { post } from '../http';

// //import * as Facebook from 'expo-auth-session/providers/facebook';

// const FACEBOOK_APP_ID = '487730007768038';
// const FACEBOOK_PIXEL_ID = '1668226144100443';//589861529976126
// const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';



// //https://api-stores.storeino.world/api/events/create?name=fbpx&type=AddToCart&ref=https:%2F%2Fmarketmall.storeino.world%2F&user_external_id=U1739191002926&eventID=610f94bf-6a2f-4968-a4c0-22ae0ef68cc1&lang=EN&cur=MAD
// const sendEventToServer = async (eventName: string, data: {}) => {
//   try {
//     const response = await post('/events/create',data)

//     console.log('✅ Event sent to Facebook CAPI:', response?.data.results);
//   } catch (error) {
//     console.error('❌ Error sending event:', error);
//   }
// };



// // Initialize Facebook SDK
// export const initializeFacebookPixel = async () => {
//   try {
//     await Facebook.initializeAsync({
//       appId: FACEBOOK_APP_ID,
//       autoLogAppEvents: true, 
//     });

//     console.log('✅ Facebook SDK Initialized');

//     const fbclid = await getFbclid();
//     if (fbclid) {
//       await AsyncStorage.setItem('__fbc', `fb.1.${Date.now()}.${fbclid}`);
//     }

//     const externalId = `U${Date.now()}`;
//     await AsyncStorage.setItem('__external_id', externalId);

//     return true;
//   } catch (error) {
//     console.error('❌ Facebook SDK Initialization Failed:', error);
//     return false;
//   }
// };

// const getFbclid = async () => {
//   try {
//     const { queryParams } = await Linking.getInitialURL();
//     return queryParams?.fbclid || null;
//   } catch (error) {
//     console.error('Error getting fbclid:', error);
//     return null;
//   }
// };


// export const logFacebookEvent = async (eventName:any, eventData = {}) => {
//   try {
//     await Facebook.logEventAsync(eventName, eventData);
//     console.log(`✅ Event Logged: ${eventName}`, eventData);
//   } catch (error) {
//     console.error(`❌ Failed to log event ${eventName}:`, error);
//   }
// };
