import { getTexturePackerPackCmd } from './texturepacker/getTexturePackerPackCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';

/**
 * Creates a sprite sheet file.
 */
export async function imagePack(
  config: PhixifyConfig,
  inputDir: string,
  outputSheet: string,
  outputData: string,
): Promise<ExecResult> {
  const execPromise = promisify(exec);
  const cmd = getTexturePackerPackCmd(config, inputDir, outputSheet, outputData);
  const cmdResult = execPromise(cmd);
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr);
      }
      if (config.options.verbose) {
        const stdout = String(result.stdout);
        console.log('Command result:', stdout.trim(), outputSheet);
      }
    });
  }
  return cmdResult as Promise<ExecResult>;
}
