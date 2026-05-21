import type { FileEntry, PhixifyConfig, PhixifyFileInfoEntry, PhixifyManifestBundleData } from '../../types.js';
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from '../const.js';
import { imageInfo } from '../../tool/imageInfo.js';
import { audioInfo } from '../../tool/audioInfo.js';

/**
 * Retrieves and attaches info about a single asset file to the manifest entry.
 */
export const getPhixifyFileInfo = (
  config: PhixifyConfig,
  sourcePath: string,
  item: FileEntry,
  type: string,
  manifestData: PhixifyManifestBundleData
): Promise<PhixifyFileInfoEntry> | null => {
  const filePath = `${sourcePath}/${item.name}.${item.ext}`;
  const manifestEntry = manifestData[type][item.name][item.ext];
  if (type === IMAGE || type === SPRITE_SHEET) {
    return imageInfo(config, filePath).then((result) => {
      if (config.tool.image === 'sharp') {
        const r = result as Record<string, unknown>;
        delete r.exif;
        delete r.icc;
        delete r.xmp;
        delete r.iptc;
      }
      manifestEntry.info = result as Record<string, unknown>;
      return manifestEntry;
    });
  } else if (type === AUDIO_SPRITE || type === SOUND) {
    return audioInfo(config, filePath).then((result) => {
      manifestEntry.info = result;
      return manifestEntry;
    });
  }
  return null;
};
