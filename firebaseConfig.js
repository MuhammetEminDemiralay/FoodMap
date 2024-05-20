import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBUp6xAb13lwSSnb9k2f-HlOkYk-T9WuKY",
  authDomain: "foodmap-7329c.firebaseapp.com",
  projectId: "foodmap-7329c",
  storageBucket: "foodmap-7329c.appspot.com",
  messagingSenderId: "579135765667",
  appId: "1:579135765667:web:81a2b56468eaec606cd316"
};

const app = initializeApp(firebaseConfig);   // Firebase e bağlandık


const auth = initializeAuth(app, {   // Firebase e bağlanan app uygulamamızı authentication için kullandık ve yapılandırma ayarlarını yaptık.
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);  // app imizi firestore için kullandık
export const storage = getStorage(app);
export const realdb = getDatabase(app)
export default app
