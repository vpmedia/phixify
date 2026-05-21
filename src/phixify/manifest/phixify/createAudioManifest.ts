import type { PhixifyCliOptions, PhixifyManifestBundleData } from '../../types.js';
import { getConfig } from '../../config/getConfig.js';
import { normalizePath, readJson, writeJson } from '../../tool/fileUtil.js';

interface AudioSpriteJsonContent {
  spritemap: Record<string, { duration: number; [k: string]: unknown }>;
  [k: string]: unknown;
}

interface SoundManifest {
  sound: Record<string, number>;
  audioSprite: Record<string, Record<string, number>>;
}

/**
 * Create audio manifest containing sound durations.
 */
export const createAudioManifest = (
  options: PhixifyCliOptions,
  bundleName: string,
  manifestData: PhixifyManifestBundleData
): void => {
  // working dir
  const config = getConfig(options);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir ?? ''}`);
  const bundleDir = config.flag.multiBundle ? `${bundleName}/` : '';
  // output template
  const soundData: SoundManifest = {
    sound: {},
    audioSprite: {},
  };
  // collect sound durations
  const soundSection = manifestData.sound ?? {};
  const soundKeys = Object.keys(soundSection);
  soundKeys.forEach((key) => {
    const wav = soundSection[key].wav;
    const info = wav?.info as Record<string, number> | undefined;
    soundData.sound[key] = info ? info.length_seconds : 0;
  });
  // collect audio sprite durations
  const audioSpriteSection = manifestData.audioSprite ?? {};
  const audioSpriteKeys = Object.keys(audioSpriteSection);
  audioSpriteKeys.forEach((key) => {
    soundData.audioSprite[key] = {};
    const spriteData = readJson<AudioSpriteJsonContent>(
      `${targetPath}${bundleDir}${config.dir.audioSprite}/${key}.json`
    );
    const spriteKeys = Object.keys(spriteData.spritemap);
    spriteKeys.forEach((spriteKey) => {
      soundData.audioSprite[key][spriteKey] = spriteData.spritemap[spriteKey].duration;
    });
  });
  // write out sound.json
  writeJson(config, soundData, `${targetPath}${bundleDir}${config.dir.data}/sound.json`);
};
