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
  const sourceResolutionValue = config.asset.resolution.slice(-1)[0];
  const sourceResolutionName = `@${sourceResolutionValue}x`;
  if (outputSheet.includes(sourceResolutionName)) {
    const variantList = config.asset.resolution.map((resolutionValue) => {
      const scale = resolutionValue / sourceResolutionValue;
      return `--variant ${scale}:@${resolutionValue}x`;
    });
    const variantOpts = variantList.join(" ").trim();
    const outputSheetVariant = outputSheet.replace(sourceResolutionName, "{v}");
    const outputDataVariant = outputData.replace(sourceResolutionName, "{v}");
    return `${path} ${opts} ${variantOpts} --sheet ${outputSheetVariant} --data ${outputDataVariant} ${inputDir}`;
  }
  return `${path} ${opts} --sheet ${outputSheet} --data ${outputData} ${inputDir}`;
};
