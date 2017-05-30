#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const { generate } = require('./src/generators');

const asd = yargs.command({
    command: 'generate [type] [name]',
    aliases: ['g'],
    desc: 'Generates component of provided type',
    handler: argv => {
        generate(argv.type, argv.name);
    }
})
    .help()
    .argv;

// console.log(asd);

