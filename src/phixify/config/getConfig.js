import { readJson } from '../tool/fileUtil.js';
import { baseConfig } from './baseConfig.js';

/**
 * Returns the configuration object.
 * @param {object} options - TBD.
 * @param {string} options.configFile - TBD.
 * @param {string} options.projectDir - TBD.
 * @param {boolean} options.verbose - TBD.
 * @returns {object} TBD.
 */
export const getConfig = (options) => {
  const jsonConfig = readJson('.phixify.json');
  const jsonCustomConfig = readJson(options.configFile);
  const opts = { options };
  return { ...baseConfig, ...jsonConfig, ...jsonCustomConfig, ...opts };
};
