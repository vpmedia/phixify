import type { Metadata } from 'sharp';
import { getMagickInfoCmd } from './imagemagick/getMagickInfoCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { getSharpInfoCmd } from './sharp/getSharpInfoCmd.js';
import type { PhixifyConfig } from '../types.js';

/**
 * Gets image information via sharp or imagemagick.
 */
export async function imageInfo(config: PhixifyConfig, file: string): Promise<Metadata | Record<string, unknown>> {
  if (config.tool.image === 'sharp') {
    return getSharpInfoCmd(config, file);
  }
  const execPromise = promisify(exec);
  const cmd = getMagickInfoCmd(config, file);
  const cmdResult = execPromise(cmd);
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
    const stdout = String(result.stdout);
    return JSON.parse(stdout) as Record<string, unknown>;
  });
}
