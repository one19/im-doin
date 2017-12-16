const opn = require('opn');
const firebase = require('firebase');
require('dotenv').load({ path: `${__dirname}/.env` });

const {
  API_KEY = 'UNSET API KEY',
  DB_NAME = 'UNSET DB NAME',
  SENDER_ID = 'UNSET SENDER ID',
  EMAIL = 'test@example.com',
  PASSWORD = 'not-a-password',
  WEBSITE = 'www.google.com'
} = process.env;

const initDb = async () =>
  await firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: `${DB_NAME}.firebaseapp.com`,
    databaseURL: `https://${DB_NAME}.firebaseio.com`,
    projectId: `${DB_NAME}`,
    storageBucket: `${DB_NAME}.appspot.com`,
    messagingSenderId: SENDER_ID
  });
const login = ref => ref.auth().signInWithEmailAndPassword(EMAIL, PASSWORD);
const getCurrent = ref =>
  ref
    .database()
    .ref('/im-doin')
    .once('value');
const pushEmptyElement = ref =>
  ref
    .database()
    .ref('/im-doin-history')
    .child('all')
    .push().key;

module.exports.updateStatus = async ({ background, message }) => {
  const ref = await initDb();
  if (!message && !background) {
    opn(WEBSITE);
    return process.exit();
  }
  await login(ref);

  const newEvent = {
    message,
    background,
    startTime: new Date().toString()
  };

  const currentStatusObj = await getCurrent(ref);
  const current = currentStatusObj.val();
  const storedEvent = Object.assign({}, current, {
    endTime: new Date().toString()
  });

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const weekDay = new Date().getDay();
  const day = new Date().getDate();

  const weekDays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  const newKey = await pushEmptyElement(ref);
  const allPath = `/im-doin-history/all/${newKey}`;
  const yearAllPath = `/im-doin-history/y/${year}/${newKey}`;
  const monthAllPath = `/im-doin-history/m/${month}/${newKey}`;
  const monthNestPath = `/im-doin-history/ym/${year}/${month}/${newKey}`;
  const dayAllPath = `/im-doin-history/d/${day}/${newKey}`;
  const dayNestPath = `/im-doin-history/ymd/${year}/${month}/${day}/${newKey}`;
  const weekDayAllPath = `/im-doin-history/wd/${weekDays[weekDay]}/${newKey}`;

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
      [dayNestPath]: storedEvent,
      [weekDayAllPath]: storedEvent
    });

  console.log('Done!');
  return process.exit();
};
