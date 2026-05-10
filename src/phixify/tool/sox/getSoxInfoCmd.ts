import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a sox info command for execution.
 */
export const getSoxInfoCmd = (config: PhixifyConfig, file: string): string => {
  const path = config.cmd.sox.path;
  const opts = '-n stat';
  return `${path} ${file} ${opts}`;
};
