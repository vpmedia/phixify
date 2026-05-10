import type { PhixifyConfig, PixiAsset, PixiManifest } from '../../types.js';
import { getPixiAudioSprite } from './getPixiAudioSprite.js';
import { getPixiBitmapFont } from './getPixiBitmapFont.js';
import { getPixiData } from './getPixiData.js';
import { getPixiImage } from './getPixiImage.js';
import { getPixiSound } from './getPixiSound.js';
import { getPixiSpriteSheet } from './getPixiSpriteSheet.js';
import { getPixiSvg } from './getPixiSvg.js';
import { AUDIO_SPRITE, DATA, IMAGE, SOUND, SPRITE_SHEET, BITMAP_FONT, SVG } from '../const.js';

type PixiGenerator = (config: PhixifyConfig, assetPath: string, targetPath: string) => PixiAsset[];

/**
 * Creates a pixi.js game engine asset manifest bundle.
 */
export const createPixiManifest = (
  config: PhixifyConfig,
  manifestData: PixiManifest,
  bundleName: string,
  assetPath: string,
  targetPath: string,
): PixiManifest => {
  const manifestGenerators: { type: string; generator: PixiGenerator }[] = [
    { type: AUDIO_SPRITE, generator: getPixiAudioSprite },
    { type: IMAGE, generator: getPixiImage },
    { type: SOUND, generator: getPixiSound },
    { type: SPRITE_SHEET, generator: getPixiSpriteSheet },
    { type: DATA, generator: getPixiData },
    { type: SVG, generator: getPixiSvg },
    { type: BITMAP_FONT, generator: getPixiBitmapFont },
  ];
  let assets: PixiAsset[] = [];
  manifestGenerators.forEach((item) => {
    const data = item.generator(config, assetPath, targetPath);
    assets = [...assets, ...data];
  });
  const bundle = { name: bundleName, assets };
  manifestData.bundles.push(bundle);
  return manifestData;
};
