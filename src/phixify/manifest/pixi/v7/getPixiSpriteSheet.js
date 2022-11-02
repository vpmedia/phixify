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
export const getPixiSpriteSheet = (config, assetPath, list) => {
  const formats = config.manifest.image;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  const map = {};
  list
    .filter((value) => value.ext !== "json")
    .forEach((value) => {
      map[value.name] = map[value.name] || [];
      map[value.name].push(value.ext);
    });
  list
    .filter((value) => value.ext === "json")
    .forEach((value) => {
      const extensions = map[value.name].sort(sortFunc).toString();
      const srcs = `${assetPath}${value.name}.{${extensions}}.${value.ext}`;
      result.push({ name: value.name, srcs });
    });
  return result;
};
