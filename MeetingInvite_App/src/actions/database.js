import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCfXiShJAY8E6g8DFGVkvSgkebmUzvrDsM',
  authDomain: 'portfolioweb-a8493.firebaseapp.com',
  databaseURL: 'https://portfolioweb-a8493.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;