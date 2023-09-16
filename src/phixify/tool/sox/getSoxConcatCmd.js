/**
 * Creates a sox audio sprite creation command for execution.
 * @param {object} config - The configuration object reference.
 * @param {object[]} durationResults - TBD.
 * @param {string} inputDir - TBD.
 * @param {string} outputFile - TBD.
 * @returns {string} TBD.
 */
export const getSoxConcatCmd = (config, durationResults, inputDir, outputFile) => {
  const path = config.cmd.sox.path;
  let concatCmdParams = '';
  durationResults.forEach((item) => {
    const inputFile = `${inputDir}${item.name}.wav`;
    concatCmdParams += `"|sox ${inputFile} -p pad 0 ${item.padDuration}" `;
  });
  return `${path} ${concatCmdParams}${outputFile}`;
};
