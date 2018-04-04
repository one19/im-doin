#!/usr/bin/env node
'use strict';

const fs = require('fs');
const program = require('commander');
const { updateConfig } = require('./config');
const { updateStatus } = require('./firebase');

const { API_KEY, DB_NAME, SENDER_ID, EMAIL, PASSWORD, WEBSITE } = process.env;
const hasEnvsSet = API_KEY && DB_NAME && SENDER_ID && EMAIL && PASSWORD && WEBSITE;

// because npm won't leave well enough alone our local configs on update
const hasRootConfig = fs.readdirSync('~').includes('.imdoinrc');
const hasLocalConfig = fs.readdirSync(__dirname).includes('.env');
const hasConfig = hasRootConfig || hasLocalConfig;

if (!hasConfig && !hasEnvsSet) {
  updateConfig();
} else {
  program.option('-m, --message [string]', 'status message').option('-b, --background [string]', '#color/img-url/preset-svg').option('-t, --text [string]', '"simple", other string, or unset for default black/white/bordered').parse(process.argv);

  updateStatus(program);
}