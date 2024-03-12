import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyATsy9I0awdPi-ayTUqdPKlvMSxUBfkBDM",
  authDomain: "foodmap-1d19f.firebaseapp.com",
  projectId: "foodmap-1d19f",
  storageBucket: "foodmap-1d19f.appspot.com",
  messagingSenderId: "113368614859",
  appId: "1:113368614859:web:c93129981dede5abead84e"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export  default app