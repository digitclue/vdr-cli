#!/usr/bin/env node

const yargs = require('yargs');

// eslint-disable-next-line no-unused-expressions
yargs
  .commandDir('./src/cmds')
  .help()
  .argv;
