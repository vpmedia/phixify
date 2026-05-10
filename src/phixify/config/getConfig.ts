import { readJson } from '../tool/fileUtil.js';
import type { PhixifyBaseConfig, PhixifyCliOptions, PhixifyConfig } from '../types.js';
import { baseConfig } from './baseConfig.js';

/**
 * Returns the configuration object.
 */
export const getConfig = (options: PhixifyCliOptions): PhixifyConfig => {
  const jsonConfig = readJson<Partial<PhixifyBaseConfig>>('.phixify.json');
  const jsonCustomConfig = readJson<Partial<PhixifyBaseConfig>>(options.configFile);
  return { ...baseConfig, ...jsonConfig, ...jsonCustomConfig, options };
};
