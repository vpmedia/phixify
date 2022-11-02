/**
 * Returns the manifest descriptor template object
 *
 * @param {object} config Reference to the configuration object
 * @returns {object} TBD
 */
export const getPhaserManifestTemplate = (config) => {
  return {
    init: {
      files: [],
    },
    meta: {
      generated: config.phixify.timestamp,
      app: config.phixify.name,
      url: config.phixify.url,
      version: config.phixify.version,
      copyright: config.phixify.copyright,
      phaserVersion: "3",
    },
  };
};
