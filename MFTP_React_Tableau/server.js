/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
let chalk = require('chalk');
const config = require('./webpack.config');
const open = require('open');
const { spawn } = require('child_process');
const PORT = require('./app/_config/dev/api').port;

/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer).listen(PORT.devServer, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  // set app proxy
  spawn('npm', ['run', 'proxy'], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));
  console.log('Listening at localhost:' + PORT.devServer);
});

compiler.plugin('done', () => {
  if (isInitialCompilation) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout(() => {
      console.log(chalk.green.bold('\n✓ The bundle is now ready for serving!\n'));
      console.log(chalk.magenta.bold('  Open in iframe mode:'), chalk.yellow.bold('http://localhost:' + PORT.devServer + '/webpack-dev-server/'));
      console.log(chalk.magenta.bold('  Open in inline mode:'), chalk.yellow.bold('http://localhost:' + PORT.devServer + '/\n'));
      console.log(`  ${chalk.yellow.bold('HMR is active. The bundle will automatically rebuild and live-update on changes.')}`)
    }, 350);
  }
  isInitialCompilation = false;
});
