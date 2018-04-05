'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const os = require('os');
const dotenv = require('dotenv');
const { updateStatus } = require('./firebase');

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

const envs = {
  apiKey: API_KEY,
  authDomain: `${DB_NAME}.firebaseapp.com`,
  databaseURL: `https://${DB_NAME}.firebaseio.com`,
  projectId: `${DB_NAME}`,
  storageBucket: `${DB_NAME}.appspot.com`,
  messagingSenderId: SENDER_ID
};

const dingleIt = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log('starting this hardcore bitch up');
    try {
      const a = yield updateStatus({ background: 'something', message: 'badsf' }, envs, function (d) {
        console.log(d);process.exit(0);
      });
      console.log('aaaaaaaaaaaa', a);
    } catch (e) {
      console.log('caught', e);
    }
    console.log('it did a thing i guess');
  });

  return function dingleIt() {
    return _ref.apply(this, arguments);
  };
})();

dingleIt();