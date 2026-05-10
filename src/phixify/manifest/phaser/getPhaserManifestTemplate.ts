import type { PhaserManifest, PhixifyConfig } from '../../types.js';

/**
 * Returns the manifest descriptor template object.
 */
export const getPhaserManifestTemplate = (config: PhixifyConfig): PhaserManifest => {
  const result: PhaserManifest = {
    init: {
      files: [],
    },
  };
  if (!config.flag.skipManifestMeta) {
    result.meta = {
      generated: config.phixify.timestamp,
      app: config.phixify.name,
      url: config.phixify.url,
      version: config.phixify.version,
      copyright: config.phixify.copyright,
      phaserVersion: '3',
    };
  }
  return result;
};
