/**
 * Command creating all manifest descriptors
 *
 * @param {object} options TBD
 * @param {string=} options.configFile - TBD
 * @param {string} options.projectDir - TBD
 * @param {boolean} options.verbose - TBD
 */
import { createPixiManifestCommand } from "./createPixiManifestCommand.js";
import { createPhaserManifestCommand } from "./createPhaserManifestCommand.js";
import { createPhixifyManifestCommand } from "./createPhixifyManifestCommand.js";
import { getConfig } from "../config/getConfig.js";
import { isFile, normalizePath } from "../tool/fileUtil.js";

export const createManifestCommand = (options) => {
  console.time("Manifests created");
  const config = getConfig(options);
  if (options.projectDir === "" && config.flag.multiProject) {
    console.error("Missing project-dir option");
    return null;
  }
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  if (!isFile(targetPath)) {
    console.error("Target path does not exist", targetPath);
    return;
  }
  if (config.engine.pixi_v7) {
    createPixiManifestCommand(options);
  }
  if (config.engine.phaser_v3) {
    createPhaserManifestCommand(options);
  }
  if (config.engine.phixify) {
    createPhixifyManifestCommand(options);
  }
  console.timeEnd("Manifests created");
};
