import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDil_PhwrHyS_LhVcojX8Ocy4xO2bkeKUk",
    authDomain: "braintumorclassification-27b0f.firebaseapp.com",
    projectId: "braintumorclassification-27b0f",
    storageBucket: "braintumorclassification-27b0f.appspot.com",
    messagingSenderId: "683840958462",
    appId: "1:683840958462:web:35727d9dbeb0218d1b5aaf"
  };

 export const FIREBASE_APP = initializeApp(firebaseConfig);
 export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Initialize Auth
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const actionCodeSettings = {
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

export { auth };
