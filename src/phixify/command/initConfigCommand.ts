import type { PhixifyCliOptions } from '../types.js';
import { getConfig } from '../config/getConfig.js';
import { writeJson } from '../tool/fileUtil.js';

/**
 * Creates the programs configuration.
 */
export const initConfigCommand = (options: PhixifyCliOptions): void => {
  const config = getConfig(options);
  const writableConfig = config as Partial<typeof config>;
  delete writableConfig.phixify;
  delete writableConfig.options;
  writeJson(config, writableConfig, './.phixify.json');
};
