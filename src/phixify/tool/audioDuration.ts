import { getSoxDurationCmd } from './sox/getSoxDurationCmd.js';
import { getFFDurationCmd } from './ffmpeg/getFFDurationCmd.js';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { AudioDurationResult, FileEntry, PhixifyConfig } from '../types.js';

/**
 * Returns the duration of a sound file.
 */
export async function audioDuration(
  config: PhixifyConfig,
  inputDir: string,
  item: FileEntry,
): Promise<AudioDurationResult> {
  const execPromise = promisify(exec);
  return new Promise<AudioDurationResult>((resolve) => {
    const cmd =
      config.tool.sound === 'sox'
        ? getSoxDurationCmd(config, `${inputDir}${item.name}.${item.ext}`)
        : getFFDurationCmd(config, `${inputDir}${item.name}.${item.ext}`);
    const cmdResult = execPromise(cmd);
    // wait for duration to be calculated
    cmdResult.then((durationValue) => {
      // calculate durations
      const duration = parseFloat(durationValue.stdout.toString());
      const roundedDuration = Math.ceil(duration + 1);
      const padDurationFloat = roundedDuration - duration;
      // fix duration calculation precision (1.2213150000000002 to 1.221315)
      const padDuration = parseFloat(padDurationFloat.toFixed(12));
      resolve({ name: item.name, duration, roundedDuration, padDuration });
    });
  });
}
