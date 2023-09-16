import { getMagickConvertCmd } from './imagemagick/getMagickConvertCmd.js';
import { getSharpConvertCmd } from './sharp/getSharpConvertCmd.js';
import { promisify } from 'util';
import { exec } from 'child_process';

/**
 * Converts an image file from one format to another.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {Promise} TBD.
 */
export async function imageConvert(config, inputFile, outputFile) {
  if (config.tool.image === 'sharp') {
    return getSharpConvertCmd(config, inputFile, outputFile);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickConvertCmd(config, inputFile, outputFile);
  const cmdResult = execPromise(cmd, { stdio: 'pipe' });
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr, inputFile);
      }
    });
  }
  return cmdResult;
}
