// Centralized Firebase initialization, shared by every page/component.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCyIzNTCeID1uWfIw_17QC5ciUBqtHqNkE',
  authDomain: 'findafriend-535b3.firebaseapp.com',
  databaseURL: 'https://findafriend-535b3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'findafriend-535b3',
  storageBucket: 'findafriend-535b3.firebasestorage.app',
  messagingSenderId: '789997283271',
  appId: '1:789997283271:web:5cb2c1c3c50d9f248d9be2',
  measurementId: 'G-TEGX90V5V8',
};

export { firebaseConfig };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
