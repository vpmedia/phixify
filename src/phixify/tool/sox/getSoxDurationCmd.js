/**
 * Creates a sox audio duration check command for execution
 *
 * @param {object} config Reference to the configuration object
 * @param {string} file TBD
 * @returns {string} TBD
 */
export const getSoxDurationCmd = (config, file) => {
  const path = config.cmd.sox.path;
  return `${path} --info -D ${file}`;
};
