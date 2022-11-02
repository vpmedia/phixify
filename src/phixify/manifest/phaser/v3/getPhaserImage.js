/**
 * Creates the image entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {object[]} list TBD
 * @param {string} list[].name - TBD
 * @param {string} list[].ext - TBD
 * @returns {object} TBD
 */
export const getPhaserImage = (config, assetPath, list) => {
  const result = [];
  list
    .filter((value) => value.ext === "webp")
    .forEach((value) => {
      const url = `${assetPath}${value.name}.${value.ext}`;
      result.push({ type: "image", key: value.name, url });
    });
  return result;
};
