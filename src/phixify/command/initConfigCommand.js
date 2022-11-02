import { getConfig } from "../config/getConfig.js";
import { writeJson } from "../tool/fileUtil.js";

/**
 * Creates the programs configuration
 *
 * @param {object} options TBD
 * @param {boolean} options.verbose - TBD
 */
export const initConfigCommand = (options) => {
  const config = getConfig(options);
  delete config.phixify;
  delete config.options;
  writeJson(config, config, "./.phixify.json");
};
