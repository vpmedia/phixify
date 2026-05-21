import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { AudioDurationResult, PhixifyConfig } from '../types.js';
import { getSoxConcatCmd } from './sox/getSoxConcatCmd.js';

export interface ExecResult {
  stdout: string;
  stderr: string;
}

/**
 * Creates an audio sheet file.
 */
export async function audioConcat(
  config: PhixifyConfig,
  durationResults: AudioDurationResult[],
  inputDir: string,
  outputFile: string
): Promise<ExecResult> {
  const execPromise = promisify(exec);
  const cmd = getSoxConcatCmd(config, durationResults, inputDir, outputFile);
  const cmdResult = execPromise(cmd);
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr, outputFile);
      }
    });
  }
  return cmdResult as Promise<ExecResult>;
}
