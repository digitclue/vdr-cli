#!/usr/bin/env node

const yargs = require('yargs');

yargs
    .commandDir('./src/cmds')
    .help()
    .argv;
