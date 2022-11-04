/**
 * Creates a texture packer command for execution
 *
 * @param {object} config The configuration object reference
 * @param {string} inputDir TBD
 * @param {string} outputSheet TBD
 * @param {string} outputData TBD
 * @returns {string} TBD
 */
export const getTexturePackerPackCmd = (config, inputDir, outputSheet, outputData) => {
  const path = config.cmd.texturePacker.path;
  const opts = config.cmd.texturePacker.opts.png.join(" ").trim();
  return `${path} ${opts} --sheet ${outputSheet} --data ${outputData} ${inputDir}`;
};
