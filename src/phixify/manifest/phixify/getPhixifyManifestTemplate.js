/**
 * Returns the manifest descriptor template object
 *
 * @param {object} config The configuration object reference
 * @returns {object} TBD
 */
export const getPhixifyManifestTemplate = (config) => {
  return {
    bundles: {},
    meta: {
      generated: config.phixify.timestamp,
      app: config.phixify.name,
      url: config.phixify.url,
      version: config.phixify.version,
      copyright: config.phixify.copyright,
      phixifyVersion: "1",
    },
  };
};
