import type { PhixifyConfig, PhixifyManifest } from '../../types.js';

/**
 * Returns the manifest descriptor template object.
 */
export const getPhixifyManifestTemplate = (config: PhixifyConfig): PhixifyManifest => {
  const result: PhixifyManifest = {
    bundles: {},
  };
  if (!config.flag.skipManifestMeta) {
    result.meta = {
      generated: config.phixify.timestamp,
      app: config.phixify.name,
      url: config.phixify.url,
      version: config.phixify.version,
      copyright: config.phixify.copyright,
      phixifyVersion: '1',
    };
  }
  return result;
};
