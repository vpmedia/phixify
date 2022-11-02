import { promisify } from "util";
import { exec } from "child_process";
import { getSoxInfoCmd } from "./sox/getSoxInfoCmd.js";
import { getFFInfoCmd } from "./ffmpeg/getFFInfoCmd.js";

/**
 * Gets image information
 *
 * @param {object} config Reference to the configuration object
 * @param {string} file TBD
 * @returns {Promise} TBD
 */
export async function audioInfo(config, file) {
  const execPromise = promisify(exec);
  const cmd =
    config.tool.sound === "sox" ? getSoxInfoCmd(config, file) : getFFInfoCmd(config, file);
  const cmdResult = execPromise(cmd, { stdio: "pipe" });
  if (config.options.verbose) {
    console.log("Running command:", cmd);
  }
  return cmdResult.then((result) => {
    const parsedResult = result.stderr
      .slice(0, -2)
      .split("\n")
      .map((entry) => {
        const parsedEntry = entry.split(":");
        const key = parsedEntry[0]
          .trim()
          .replace(":", "")
          .toLowerCase()
          .replace(/\s\s+/g, " ")
          .replace(" ", "_")
          .replace("(", "")
          .replace(")", "");
        const value = parseFloat(parsedEntry[1].trim());
        const kv = {};
        kv[key] = value;
        return kv;
      });
    const finalResult = parsedResult.reduce((obj, item) => {
      obj[Object.keys(item)[0]] = Object.values(item)[0];
      return obj;
    }, {});
    return finalResult;
  });
}
