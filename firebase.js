const firebase = require('firebase');

const {
  API_KEY = 'UNSET API KEY',
  DB_NAME = 'UNSET DB NAME',
  SENDER_ID = 'UNSET SENDER ID',
  EMAIL = 'test@example.com',
  PASSWORD = 'not-a-password'
} = process.env;

// Initialize Firebase
const ref = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: `${DB_NAME}.firebaseapp.com`,
  databaseURL: `https://${DB_NAME}.firebaseio.com`,
  projectId: `${DB_NAME}`,
  storageBucket: `${DB_NAME}.appspot.com`,
  messagingSenderId: SENDER_ID
});

const login = () => ref.auth().signInWithEmailAndPassword(EMAIL, PASSWORD);
const getCurrent = () =>
  ref
    .database()
    .ref('/im-doin')
    .once('value');
const pushEmptyElement = () =>
  ref
    .database()
    .ref('/im-doin-history')
    .child('all')
    .push().key;

module.exports.updateStatus = async ({ background, message }) => {
  await login();

  const newEvent = {
    message,
    background,
    startTime: new Date().toString()
  };

  const currentStatusObj = await getCurrent();
  const current = currentStatusObj.val();
  const storedEvent = Object.assign({}, current, {
    endTime: new Date().toString()
  });

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const newKey = await pushEmptyElement();
  const allPath = `/im-doin-history/all/${newKey}`;
  const yearAllPath = `/im-doin-history/y/${year}/${newKey}`;
  const monthAllPath = `/im-doin-history/m/${month}/${newKey}`;
  const monthNestPath = `/im-doin-history/ym/${year}/${month}/${newKey}`;
  const dayAllPath = `/im-doin-history/d/${newKey}`;
  const dayNestPath = `/im-doin-history/ymd/${year}/${month}/${day}/${newKey}`;

  await ref
    .database()
    .ref()
    .update({
      '/im-doin': newEvent,
      [allPath]: storedEvent,
      [yearAllPath]: storedEvent,
      [monthAllPath]: storedEvent,
      [monthNestPath]: storedEvent,
      [dayAllPath]: storedEvent,
      [dayNestPath]: storedEvent
    });

  console.log('Done!');
  process.exit();
};
