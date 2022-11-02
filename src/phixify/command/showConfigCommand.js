import { getConfig } from "../config/getConfig.js";

/**
 * Displays the current program configuration
 *
 * @param {object} options TBD
 * @param {string=} options.configFile - TBD
 * @param {boolean} options.verbose - TBD
 */
export const showConfigCommand = (options) => {
  console.log(getConfig(options));
};
