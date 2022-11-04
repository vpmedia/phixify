/**
 * Gets ffmpeg info command for execution
 *
 * @param {object} config The configuration object reference
 * @param {string} file TBD
 * @returns {string} TBD
 */
export const getFFInfoCmd = (config, file) => {
  const path = config.cmd.ffprobe.path;
  const opts = "-v quiet -print_format json -show_format -show_streams";
  return `${path} ${opts} ${file}`;
};
