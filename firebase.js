const firebase = require('firebase');

// Initialize Firebase
const ref = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.DB_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.DB_NAME}.firebaseio.com`,
  projectId: `${process.env.DB_NAME}`,
  storageBucket: `${process.env.DB_NAME}.appspot.com`,
  messagingSenderId: process.env.SENDER_ID
});

const setStatus = status =>
  ref.database().ref('/im-doin').set({
    message: status.message,
    background: status.background,
    startTime: new Date().toString()
  });

// const setUpHistory = () =>
//   ref.database().ref('/im-doin-history').set({ events: {} });

const pushHistory = async last => {
  const key = ref.database().ref('/im-doin-history').child('events').push().key;
  return ref
    .database()
    .ref('/im-doin-history')
    .child(`/events/${key}`)
    .update(Object.assign({}, last, { endTime: new Date().toString() }));
};

const login = () =>
  ref
    .auth()
    .signInWithEmailAndPassword(process.env.EMAIL, process.env.PASSWORD);

const getCurrent = () => ref.database().ref('/im-doin').once('value');

module.exports.updateStatus = async stuff => {
  await login();

  const currentStatusObj = await getCurrent();
  const current = currentStatusObj.val();

  // await setUpHistory();
  await Promise.all([pushHistory(current), setStatus(stuff)]);

  console.log('Done!');
  process.exit();
};
