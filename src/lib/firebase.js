import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyATigFNau3AcecvrykYaK570swEO5wAKfI',
  authDomain: 'instagram-27c70.firebaseapp.com',
  projectId: 'instagram-27c70',
  storageBucket: 'instagram-27c70.appspot.com',
  messagingSenderId: '141019754675',
  appId: '1:141019754675:web:75c9bd2a64054b6ae8c0c6',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
