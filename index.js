#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const { updateConfig } = require('./config');

const hasConfig = fs.readdirSync(__dirname).includes('.env');
if (!hasConfig) {
  updateConfig();
} else {
  const { updateStatus } = require('./firebase'); // eslint-disable-line global-require
  program
    .option('-m, --message [string]', 'status message')
    .option('-b, --background [string]', '#color/img-url/preset-svg')
    .parse(process.argv);

  updateStatus(program);
}
