import { promisify } from "util";
import { exec } from "child_process";
import { getSoxConvertCmd } from "./sox/getSoxConvertCmd.js";
import { getFFConvertCmd } from "./ffmpeg/getFFConvertCmd.js";

/**
 * Converts an audio file from one format to another.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {Promise} TBD.
 */
export async function audioConvert(config, inputFile, outputFile) {
  const execPromise = promisify(exec);
  const cmd =
    config.tool.sound === "sox"
      ? getSoxConvertCmd(config, inputFile, outputFile)
      : getFFConvertCmd(config, inputFile, outputFile);
  const cmdResult = execPromise(cmd, { stdio: "pipe" });
  if (config.options.verbose) {
    console.log("Running command:", cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn("Command result:", result.stderr.trim(), outputFile);
      }
    });
  }
  return cmdResult;
}
