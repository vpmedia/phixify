import { createAssetCommand } from './createAssetCommand.js';
import { createManifestCommand } from './createManifestCommand.js';

/**
 * Runs the asset and manifest generation commands.
 * @param {object} options - TBD.
 * @param {string} options.configFile - TBD.
 * @param {string} options.projectDir - TBD.
 * @param {boolean} options.verbose - TBD.
 */
export const createAllCommand = (options) => {
  const generateAssetResult = createAssetCommand(options);
  if (!generateAssetResult) {
    return;
  }
  generateAssetResult.then(() => {
    createManifestCommand(options);
  });
};
