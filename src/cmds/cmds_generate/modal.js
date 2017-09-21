const path = require('path');
const chalk = require('chalk');

const Blueprint = require('../../blueprint');

const error = chalk.bold.red;

module.exports.command = 'modal <name>';
module.exports.desc = 'Generates component files.';
module.exports.builder = yargs => yargs.fail(() => {
  console.log(error('The `vdr generate modal` command requires a name to be specified.'));
  process.exit(1);
});
module.exports.handler = (argv) => {
  const { dir, name } = path.parse(argv.name);

  const blueprint = new Blueprint('modal', name);

  if (!blueprint.isValid) {
    console.error('not valid');
  }

  blueprint.install(path.join(dir, name));
};
