import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { PhixifyConfig } from '../types.js';
import { getSoxInfoCmd } from './sox/getSoxInfoCmd.js';
import { getFFInfoCmd } from './ffmpeg/getFFInfoCmd.js';

/**
 * Gets audio info via sox/ffprobe.
 */
export async function audioInfo(config: PhixifyConfig, file: string): Promise<Record<string, number>> {
  const execPromise = promisify(exec);
  const cmd = config.tool.sound === 'sox' ? getSoxInfoCmd(config, file) : getFFInfoCmd(config, file);
  const cmdResult = execPromise(cmd);
  if (config.options.verbose) {
    console.log('Running command:', cmd);
  }
  return cmdResult.then((result) => {
    const stderr = String(result.stderr);
    const parsedResult = stderr
      .slice(0, -2)
      .split('\n')
      .map((entry: string) => {
        const parsedEntry = entry.split(':');
        const key = parsedEntry[0]
          .trim()
          .replace(':', '')
          .toLowerCase()
          .replace(/\s\s+/g, ' ')
          .replace(' ', '_')
          .replace('(', '')
          .replace(')', '');
        const value = parseFloat(parsedEntry[1].trim());
        const kv: Record<string, number> = {};
        kv[key] = value;
        return kv;
      });
    const finalResult = parsedResult.reduce<Record<string, number>>((obj: Record<string, number>, item: Record<string, number>) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
      return obj;
    }, {});
    return finalResult;
  });
}
