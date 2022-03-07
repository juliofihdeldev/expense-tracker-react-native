import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey            : 'AIzaSyD2Tww6nne1FXvQyBlJeK8siCEf6BGrakc',
	authDomain        : 'expense-tracker-3b43f.firebaseapp.com',
	projectId         : 'expense-tracker-3b43f',
	storageBucket     : 'expense-tracker-3b43f.appspot.com',
	messagingSenderId : '181393996435',
	appId             : '1:181393996435:web:f8c196254c728761a4eb66',
	measurementId     : 'G-NYJ8CWWV7C',
};

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
}
else {
	app = firebase.app();
}

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
