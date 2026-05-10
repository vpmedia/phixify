import type { OutputInfo } from 'sharp';
import { getMagickConvertCmd } from './imagemagick/getMagickConvertCmd.js';
import { getSharpConvertCmd } from './sharp/getSharpConvertCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';

/**
 * Converts an image file from one format to another.
 */
export async function imageConvert(
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string,
): Promise<OutputInfo | ExecResult> {
  if (config.tool.image === 'sharp') {
    return getSharpConvertCmd(config, inputFile, outputFile);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickConvertCmd(config, inputFile, outputFile);
  const cmdResult = execPromise(cmd);
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
  return cmdResult as Promise<ExecResult>;
}
