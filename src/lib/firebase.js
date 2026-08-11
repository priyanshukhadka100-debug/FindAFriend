// Centralized Firebase initialization, shared by every page/component.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC2Cj1nXJQ6MnV3NQOM-NVlI6Da1GWIT8I',
  authDomain: 'findafriend-2.firebaseapp.com',
  databaseURL: 'https://findafriend-2-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'findafriend-2',
  storageBucket: 'findafriend-2.firebasestorage.app',
  messagingSenderId: '681290347001',
  appId: '1:681290347001:web:b4989566229fbfa8168d28',
  measurementId: 'G-M4X5S10KYX',
};

export { firebaseConfig };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
