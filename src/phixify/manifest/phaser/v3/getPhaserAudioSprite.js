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
export const getPhaserAudioSprite = (config, assetPath, list) => {
  const formats = config.manifest.sound;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  const map = {};
  list.forEach((value) => {
    map[value.name] = map[value.name] || [];
    map[value.name].push(value.ext);
  });
  Object.entries(map).forEach(([key, value]) => {
    const audioURL = value
      .filter((ext) => ext !== "json")
      .sort(sortFunc)
      .map((ext) => `${assetPath}${key}.${ext}`);
    const jsonURL = `${assetPath}${key}.json`;
    result.push({ type: "audioSprite", key, audioURL, jsonURL });
  });
  return result;
};
