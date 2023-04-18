import { promisify } from "util";
import { exec } from "child_process";
import { getSoxConcatCmd } from "./sox/getSoxConcatCmd.js";

/**
 * Creates an audio sheet file.
 * @param {object} config - The configuration object reference.
 * @param {object[]} durationResults - TBD.
 * @param {string} durationResults[].name - TBD.
 * @param {number} durationResults[].duration - TBD.
 * @param {number} durationResults[].roundedDuration - TBD.
 * @param {number} durationResults[].padDuration - TBD.
 * @param {string} inputDir - TBD.
 * @param {string} outputFile - TBD.
 * @returns {Promise} TBD.
 */
export async function audioConcat(config, durationResults, inputDir, outputFile) {
  const execPromise = promisify(exec);
  const cmd = getSoxConcatCmd(config, durationResults, inputDir, outputFile);
  const cmdResult = execPromise(cmd, { stdio: "pipe" });
  if (config.options.verbose) {
    console.log("Running command:", cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr, outputFile);
      }
    });
  }
  return cmdResult;
}
