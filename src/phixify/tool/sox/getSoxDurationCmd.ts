import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a sox audio duration check command for execution.
 */
export const getSoxDurationCmd = (config: PhixifyConfig, file: string): string => {
  const path = config.cmd.sox.path;
  return `${path} --info -D ${file}`;
};
