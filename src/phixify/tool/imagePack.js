import { getTexturePackerPackCmd } from './texturepacker/getTexturePackerPackCmd.js';
import { promisify } from 'util';
import { exec } from 'child_process';

/**
 * Creates a sprite sheet file.
 * @param {object} config - The configuration object reference.
 * @param {string} inputDir - TBD.
 * @param {string} outputSheet - TBD.
 * @param {string} outputData - TBD.
 * @returns {Promise} TBD.
 */
export async function imagePack(config, inputDir, outputSheet, outputData) {
  const execPromise = promisify(exec);
  const cmd = getTexturePackerPackCmd(config, inputDir, outputSheet, outputData);
  const cmdResult = execPromise(cmd, { stdio: 'pipe' });
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr);
      }
      if (config.options.verbose) {
        console.log('Command result:', result.stdout.trim(), outputSheet);
      }
    });
  }
  return cmdResult;
}
