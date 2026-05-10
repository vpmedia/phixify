import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a ffmpeg audio duration check command for execution.
 */
export const getFFDurationCmd = (config: PhixifyConfig, file: string): string => {
  const path = config.cmd.ffprobe.path;
  const opts = '-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1';
  return `${path} ${opts} ${file}`;
};
