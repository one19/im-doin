const os = require('os');
const opn = require('opn');
const firebase = require('firebase');
const dotenv = require('dotenv');

dotenv.load({ path: `${os.homedir()}/.imdoinrc` });
dotenv.load({ path: `${__dirname}/.env` });

const {
  API_KEY = 'UNSET API KEY',
  DB_NAME = 'UNSET DB NAME',
  SENDER_ID = 'UNSET SENDER ID',
  EMAIL = 'test@example.com',
  PASSWORD = 'not-a-password',
  WEBSITE = 'www.google.com'
} = process.env;

const initDb = async envs =>
  await firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: `${DB_NAME}.firebaseapp.com`,
    databaseURL: `https://${DB_NAME}.firebaseio.com`,
    projectId: `${DB_NAME}`,
    storageBucket: `${DB_NAME}.appspot.com`,
    messagingSenderId: SENDER_ID,
    ...envs
  });

const login = (ref, envs) =>
  ref
    .auth()
    .signInWithEmailAndPassword(EMAIL || envs.email, PASSWORD || envs.password);
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

module.exports.updateStatus = async (
  { background, message, text },
  envs,
  callback = () => process.exit(0)
) => {
  const ref = await initDb(envs);
  if (!message && !background) {
    opn(WEBSITE);
    return process.exit();
  }
  await login(ref, envs);

  const newEvent = {
    message,
    background,
    startTime: new Date().toString()
  };
  if (text) newEvent.textColor = text;

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

  try {
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
  } catch (err) {
    return callback(err);
  }

  return callback();
};
