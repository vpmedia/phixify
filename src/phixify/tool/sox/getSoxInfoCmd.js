/**
 * Creates a sox info command for execution
 *
 * @param {object} config Reference to the configuration object
 * @param {string} file TBD
 * @returns {string} TBD
 */
export const getSoxInfoCmd = (config, file) => {
  const path = config.cmd.sox.path;
  const opts = "-n stat";
  return `${path} ${file} ${opts}`;
};
