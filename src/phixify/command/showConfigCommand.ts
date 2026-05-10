import type { PhixifyCliOptions } from '../types.js';
import { getConfig } from '../config/getConfig.js';

/**
 * Displays the current program configuration.
 */
export const showConfigCommand = (options: PhixifyCliOptions): void => {
  console.log(getConfig(options));
};
