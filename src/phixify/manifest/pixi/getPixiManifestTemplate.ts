import type { PhixifyConfig, PixiManifest } from '../../types.js';

/**
 * Returns the manifest descriptor template object.
 */
export const getPixiManifestTemplate = (config: PhixifyConfig): PixiManifest => {
  const result: PixiManifest = {
    bundles: [],
  };
  if (!config.flag.skipManifestMeta) {
    result.meta = {
      generated: config.phixify.timestamp,
      app: config.phixify.name,
      url: config.phixify.url,
      version: config.phixify.version,
      copyright: config.phixify.copyright,
      pixiVersion: '8',
    };
  }
  return result;
};
