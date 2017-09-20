module.exports.command = 'generate <blueprint>';
module.exports.aliases = ['g'];
module.exports.desc = 'Generates files based on a blueprint.';
module.exports.builder = yargs => yargs.commandDir('./cmds_generate');

module.exports.handler = () => ({});

