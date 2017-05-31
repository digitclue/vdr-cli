#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const Blueprint = require('./src/blueprint');

yargs.command({
    command: 'generate <blueprint> <name>',
    aliases: ['g'],
    desc: 'Generates component of provided type',
    handler: argv => {
        const { dir, name } = path.parse(argv.name);

        const blueprint = new Blueprint(argv.blueprint, name);

        if (!blueprint.isValid) {
            console.error('not valid');
        }

        blueprint.install(dir);
    }
})
    .help()
    .argv;
