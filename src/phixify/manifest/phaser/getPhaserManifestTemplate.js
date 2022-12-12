/**
 * Returns the manifest descriptor template object
 *
 * @param {object} config The configuration object reference
 * @returns {object} TBD
 */
export const getPhaserManifestTemplate = (config) => {
  const result = {
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
      phaserVersion: "3",
    };
  }
  return result;
};
