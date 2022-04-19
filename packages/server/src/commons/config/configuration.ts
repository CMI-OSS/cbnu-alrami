import { readFileSync } from "fs";
import { join } from "path";

import * as yaml from "js-yaml";

export default () => {
  const YAML_CONFIG_FILENAME = `../../../${
    process.env.NODE_ENV ? process.env.NODE_ENV : "prod"
  }.yaml`;
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8"),
  ) as Record<string, any>;
};
