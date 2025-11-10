import { getMagickInfoCmd } from './imagemagick/getMagickInfoCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { getSharpInfoCmd } from './sharp/getSharpInfoCmd.js';

/**
 * Gets image information.
 * @param {object} config - The configuration object reference.
 * @param {string} file - TBD.
 * @returns {Promise} TBD.
 */
export async function imageInfo(config, file) {
  if (config.tool.image === 'sharp') {
    return getSharpInfoCmd(config, file);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickInfoCmd(config, file);
  const cmdResult = execPromise(cmd, { stdio: 'pipe' });
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr, file);
      }
    });
  }
  return cmdResult.then((result) => {
    return JSON.parse(result.stdout);
  });
}
