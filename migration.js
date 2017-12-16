const firebase = require('firebase');
require('./src/config');

/*
 * THIS IS HERE FOR POSTERITY
 * In a previous version of the app, the database was much simpler
 * this file has been left here as an example for how a migration might be done
 * it doesn't paginate, so it likely wouldn't work well on dbs with many more
 * elements, but this is a pretty good example of a small migration.
*/

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

const doTheMigrationNow = async () => {
  await login();

  const events = await ref
    .database()
    .ref('/im-doin-history/events')
    .once('value');

  const updates = Object.keys(events.val()).reduce((upDs, key) => {
    const event = events.val()[key];

    const date = new Date(event.startTime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const allPath = `/im-doin-history/all`;
    const yearAllPath = `/im-doin-history/y/${year}`;
    const monthAllPath = `/im-doin-history/m/${year}/${month}`;
    const dayAllPath = `/im-doin-history/d/${year}/${month}/${day}`;

    if (!upDs[allPath]) upDs[allPath] = {};
    if (!upDs[yearAllPath]) upDs[yearAllPath] = {};
    if (!upDs[monthAllPath]) upDs[monthAllPath] = {};
    if (!upDs[dayAllPath]) upDs[dayAllPath] = {};

    upDs[allPath][key] = event;
    upDs[yearAllPath][key] = event;
    upDs[monthAllPath][key] = event;
    upDs[dayAllPath][key] = event;

    return upDs;
  }, {});

  await ref
    .database()
    .ref()
    .update(updates);

  console.log('Successfully did the migration!');
  process.exit();
};

doTheMigrationNow();
