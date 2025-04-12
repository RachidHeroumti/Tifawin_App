import axios from 'axios';
import config from './utility/config'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL ='https://admin.storeino.world';
//https://admin.storeino.world/login
//don't delete it : used in checkout 
export const storeBaseURL = "https://wahid-market.storeino.com/"; 
///xro@.1.App
//Strillo1
const { clientId, clientSecret } = config?.token;

if (!clientId || !clientSecret) {
  throw new Error('Client ID or Client Secret is missing in the configuration.');
}


const getToken=async()=>{
  let storedToken = await AsyncStorage.getItem('token');
  
  if(!storedToken||storedToken===null){
     return ''
  }else {
     return storedToken ;
    }
}

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json', 
  },
});



// instance.interceptors.request.use(async (config) => {
//   try {
//     const token = await getToken({ clientId, clientSecret });

//     if (token) {
//       config.headers['x-auth-token'] = token; 
//     }
//   } catch (error) {
//     console.error('Failed to set token in headers:', error);
//   }
//   return config;
// });

// API methods
export const get = async (url: string, params = {}) => {
  const tokenStored =await AsyncStorage.getItem('token');
  console.log(`${baseURL}${url}`)
  return axios.get(`${baseURL}${url}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenStored,
    },
  });
};

export const post = async (url: string, params: {} = {}, data: any = {}) => {
  console.log("🚀 ~ post ~ url:", url)
  console.log("🚀 ~ post ~ params:", params) 
console.log("🚀 ~ post ~ body:", data)
  const tokenStored = await AsyncStorage.getItem('token');
  console.log(`${baseURL}${url}`);

  return axios.post(`${baseURL}${url}`, data, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenStored,
    },
  });
};

export const put = async (url: string, params: {} = {}, data: any = {}) => {
  console.log("🚀 ~ post ~ params:", params)
  const tokenStored = await AsyncStorage.getItem('token');
  console.log(`${baseURL}${url}`);

  return axios.post(`${baseURL}${url}`, data, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenStored,
    },
  });
};

export const del = async (url: string, params: {} = {}) => {
  console.log("🚀 ~ del ~ params:", params);
  const tokenStored = await AsyncStorage.getItem('token');
  console.log(`${baseURL}${url}`);

  return axios.delete(`${baseURL}${url}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenStored,
    },
  });
};



// Customer-specific methods(get orders,details ...)
export const getForCustomer = async (url: string, params = {}, customerToken: string) => {
  return axios.get(`${baseURL}${url}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': customerToken,
    },
  });
};

export const postForCustomer = async (url: string, data: any = {}, customerToken: string) => {
  return axios.post(`${baseURL}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': customerToken,
    },
  });
};

//events 
//https://api-stores.storeino.world/api/events/create  name=fbpx




