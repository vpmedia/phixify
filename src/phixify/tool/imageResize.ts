import type { OutputInfo } from 'sharp';
import { getMagickResizeCmd } from './imagemagick/getMagickResizeCmd.js';
import { getSharpResizeCmd } from './sharp/getSharpResizeCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';

/**
 * Resizes an image file to an another file.
 */
export async function imageResize(
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string,
  scale: number
): Promise<OutputInfo | ExecResult> {
  if (config.tool.image === 'sharp') {
    return getSharpResizeCmd(config, inputFile, outputFile, scale);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickResizeCmd(config, inputFile, outputFile, scale);
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
