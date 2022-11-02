/**
 * Creates the audio sprite entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {object[]} list TBD
 * @param {string} list[].name - TBD
 * @param {string} list[].ext - TBD
 * @returns {object} TBD
 */
export const getPixiAudioSprite = (config, assetPath, list) => {
  const formats = config.manifest.sound;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  // json
  list
    .filter((value) => value.ext === "json")
    .forEach((value) => {
      result.push({
        name: `${value.name}_data`,
        srcs: `${assetPath}${value.name}.${value.ext}`,
      });
    });
  // audio
  const map = {};
  list
    .filter((value) => value.ext !== "json")
    .forEach((value) => {
      map[value.name] = map[value.name] || [];
      map[value.name].push(value.ext);
    });
  Object.entries(map).forEach(([key, value]) => {
    const extensions = value.sort(sortFunc).toString();
    const srcs = `${assetPath}${key}.{${extensions}}`;
    result.push({ name: key, srcs });
  });
  return result;
};
