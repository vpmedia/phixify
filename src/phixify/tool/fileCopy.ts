import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';

/**
 * Copies a file.
 */
export async function fileCopy(config: PhixifyConfig, inputFile: string, outputFile: string): Promise<ExecResult> {
  const execPromise = promisify(exec);
  const cmd = `cp ${inputFile} ${outputFile}`;
  const cmdResult = execPromise(cmd);
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  return cmdResult as Promise<ExecResult>;
}
