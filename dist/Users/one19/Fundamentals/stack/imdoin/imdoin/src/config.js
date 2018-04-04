'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');
const prompt = require('prompt');

const schema = {
  properties: {
    api_key: {
      description: 'API KEY'
    },
    db_name: {
      description: 'DB NAME'
    },
    sender_id: {
      description: 'SENDER ID'
    },
    email: {
      description: 'EMAIL ADDRESS'
    },
    password: {
      description: 'PASSWORD'
    },
    website: {
      description: 'WEBSITE URL'
    }
  }
};

module.exports.updateConfig = _asyncToGenerator(function* () {
  prompt.start();

  prompt.get(schema, function (err, result) {
    if (err) throw new Error('INVALID ANSWERS, TRY AGAIN PLEASE!');

    const envContents = Object.keys(result).map(function (env) {
      return `${env.toUpperCase()}=${result[env]}`;
    }).join('\n');

    fs.writeFileSync(`${__dirname}/.env`, envContents);
    fs.writeFileSync(`~/.imdoinrc`, envContents);
    console.log('Updated config information!');
  });
});