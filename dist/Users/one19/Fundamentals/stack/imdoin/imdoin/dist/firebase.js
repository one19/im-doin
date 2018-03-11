'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

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

const initDb = (() => {
  var _ref = _asyncToGenerator(function* (envs) {
    return yield firebase.initializeApp(_extends({
      apiKey: API_KEY,
      authDomain: `${DB_NAME}.firebaseapp.com`,
      databaseURL: `https://${DB_NAME}.firebaseio.com`,
      projectId: `${DB_NAME}`,
      storageBucket: `${DB_NAME}.appspot.com`,
      messagingSenderId: SENDER_ID
    }, envs));
  });

  return function initDb(_x) {
    return _ref.apply(this, arguments);
  };
})();
const login = (ref, envs) => ref.auth().signInWithEmailAndPassword(EMAIL || envs.email, PASSWORD || envs.password);
const getCurrent = ref => ref.database().ref('/im-doin').once('value');
const pushEmptyElement = ref => ref.database().ref('/im-doin-history').child('all').push().key;

module.exports.updateStatus = (() => {
  var _ref2 = _asyncToGenerator(function* ({ background, message, text }, envs) {
    const ref = yield initDb(envs);
    if (!message && !background) {
      opn(WEBSITE);
      return process.exit();
    }
    yield login(ref, envs);

    const newEvent = {
      message,
      background,
      startTime: new Date().toString()
    };
    if (text) newEvent.textColor = text;

    const currentStatusObj = yield getCurrent(ref);
    const current = currentStatusObj.val();
    const storedEvent = Object.assign({}, current, {
      endTime: new Date().toString()
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const weekDay = new Date().getDay();
    const day = new Date().getDate();

    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    const newKey = yield pushEmptyElement(ref);
    const allPath = `/im-doin-history/all/${newKey}`;
    const yearAllPath = `/im-doin-history/y/${year}/${newKey}`;
    const monthAllPath = `/im-doin-history/m/${month}/${newKey}`;
    const monthNestPath = `/im-doin-history/ym/${year}/${month}/${newKey}`;
    const dayAllPath = `/im-doin-history/d/${day}/${newKey}`;
    const dayNestPath = `/im-doin-history/ymd/${year}/${month}/${day}/${newKey}`;
    const weekDayAllPath = `/im-doin-history/wd/${weekDays[weekDay]}/${newKey}`;

    yield ref.database().ref().update({
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
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();