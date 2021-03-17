#!/usr/bin/env node

const { Command } = require('commander');
const pkg = require('../package.json');
const concat = require('../src/index');

const program = new Command();

program
  .version(pkg.version)
  .requiredOption('-o, --output <file>', 'output file')
  .description(pkg.description);

program.parse(process.argv);

if (program.args.length) {
  const opts = program.opts();
  const start = Date.now();
  concat(program.args, opts.output)
    // eslint-disable-next-line no-console
    .then((dest) => console.log(`\n created ${dest} in ${Date.now() - start} ms\n`))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
} else {
  throw new Error('no files specified');
}
