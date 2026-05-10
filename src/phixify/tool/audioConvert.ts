import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';
import { getSoxConvertCmd } from './sox/getSoxConvertCmd.js';
import { getFFConvertCmd } from './ffmpeg/getFFConvertCmd.js';

/**
 * Converts an audio file from one format to another.
 */
export async function audioConvert(
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string,
): Promise<ExecResult> {
  const execPromise = promisify(exec);
  const cmd =
    config.tool.sound === 'sox'
      ? getSoxConvertCmd(config, inputFile, outputFile)
      : getFFConvertCmd(config, inputFile, outputFile);
  const cmdResult = execPromise(cmd);
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn('Command result:', result.stderr.trim(), outputFile);
      }
    });
  }
  return cmdResult as Promise<ExecResult>;
}
