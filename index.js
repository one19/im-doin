#!/usr/bin/env node
require('dotenv-safe').load();
const program = require('commander');
const { updateStatus } = require('./firebase');

program
  .option('-m  --message <string>', 'status message')
  .option('-b, --background [string]', '#color/img-url/preset-svg')
  .parse(process.argv);

updateStatus(program);
