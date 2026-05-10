import type { PhixifyConfig } from '../../types.js';

/**
 * Gets ffmpeg info command for execution.
 */
export const getFFInfoCmd = (config: PhixifyConfig, file: string): string => {
  const path = config.cmd.ffprobe.path;
  const opts = '-v quiet -print_format json -show_format -show_streams';
  return `${path} ${opts} ${file}`;
};
