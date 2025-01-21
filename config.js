import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    // apiKey: "AIzaSyDil_PhwrHyS_LhVcojX8Ocy4xO2bkeKUk",
    // authDomain: "braintumorclassification-27b0f.firebaseapp.com",
    // projectId: "braintumorclassification-27b0f",
    // storageBucket: "braintumorclassification-27b0f.appspot.com",
    // messagingSenderId: "683840958462",
    // appId: "1:683840958462:web:35727d9dbeb0218d1b5aaf"

    // apiKey: "AIzaSyCb_XLrI6plV-ws5W_ZTmtAf5CITHgrZYk",
    // authDomain: "zrreminder.firebaseapp.com",
    // projectId: "zrreminder",
    // storageBucket: "zrreminder.appspot.com",
    // messagingSenderId: "781342438289",
    // appId: "1:781342438289:web:4952aba4567a6cefe02030",
    // measurementId: "G-KV1JN9LKMJ"
    apiKey: "AIzaSyDil_PhwrHyS_LhVcojX8Ocy4xO2bkeKUk",
    authDomain: "braintumorclassification-27b0f.firebaseapp.com",
    projectId: "braintumorclassification-27b0f",
    storageBucket: "braintumorclassification-27b0f.firebasestorage.app",
    messagingSenderId: "683840958462",
    appId: "1:683840958462:web:35727d9dbeb0218d1b5aaf"
  };

 export const FIREBASE_APP = initializeApp(firebaseConfig);
 export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
 export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
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
