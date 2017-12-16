#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const { updateConfig } = require('./config');
const { updateStatus } = require('./firebase');

export default updateStatus;

const { API_KEY, DB_NAME, SENDER_ID, EMAIL, PASSWORD, WEBSITE } = process.env;
const hasEnvsSet =
  API_KEY && DB_NAME && SENDER_ID && EMAIL && PASSWORD && WEBSITE;

const hasConfig = fs.readdirSync(__dirname).includes('.env');

if (!hasConfig && !hasEnvsSet) {
  updateConfig();
} else {
  program
    .option('-m, --message [string]', 'status message')
    .option('-b, --background [string]', '#color/img-url/preset-svg')
    .parse(process.argv);

  updateStatus(program);
}
