/**
 * Creates the audio sprite entries for the manifest object
 *
 * @param {object} config The configuration object reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object} TBD
 */
import { AUDIO_SPRITE } from "../core/const.js";
import { getFileList } from "../../tool/fileUtil.js";

export const getPixiAudioSprite = (config, assetPath, targetPath) => {
  const dir = config.dir[AUDIO_SPRITE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
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
        srcs: `${path}${value.name}.${value.ext}`,
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
    const srcs = `${path}${key}.{${extensions}}`;
    result.push({ name: key, srcs });
  });
  return result;
};
