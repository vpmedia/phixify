import type { PhixifyCliOptions } from '../types.js';
import { createAssetCommand } from './createAssetCommand.js';
import { createManifestCommand } from './createManifestCommand.js';

/**
 * Runs the asset and manifest generation commands.
 */
export const createAllCommand = (options: PhixifyCliOptions): void => {
  const generateAssetResult = createAssetCommand(options);
  if (!generateAssetResult) {
    return;
  }
  generateAssetResult.then(() => {
    createManifestCommand(options);
  });
};
