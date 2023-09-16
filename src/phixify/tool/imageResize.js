import { getMagickResizeCmd } from './imagemagick/getMagickResizeCmd.js';
import { getSharpResizeCmd } from './sharp/getSharpResizeCmd.js';
import { promisify } from 'util';
import { exec } from 'child_process';

/**
 * Resizes an image file to an another file.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @param {number} scale - TBD.
 * @returns {Promise} TBD.
 */
export async function imageResize(config, inputFile, outputFile, scale) {
  if (config.tool.image === 'sharp') {
    return getSharpResizeCmd(config, inputFile, outputFile, scale);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickResizeCmd(config, inputFile, outputFile, scale);
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
