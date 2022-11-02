/**
 * Creates the sprite sheet entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {object[]} list TBD
 * @param {string} list[].name - TBD
 * @param {string} list[].ext - TBD
 * @returns {object} TBD
 */
export const getPhaserSpriteSheet = (config, assetPath, list) => {
  const result = [];
  list
    .filter((value) => value.ext === "webp")
    .forEach((value) => {
      const atlasURL = `${assetPath}${value.name}.webp.json`;
      const textureURL = `${assetPath}${value.name}.webp`;
      result.push({ type: "atlas", key: value.name, textureURL, atlasURL });
    });
  return result;
};
