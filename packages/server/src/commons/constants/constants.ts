import { readFileSync } from "fs";
import { join } from "path";

import configuration from "src/commons/config/configuration";

const yaml = configuration();
export const ROOT_DIR = join(__dirname, "../../../");
// TODO export const ACCESS_PUBLIC_KEY = readFileSync(join(ROOT_DIR, yaml.accessPublicKeyFile));
export const ACCESS_PRIVATE_KEY = readFileSync(
  join(ROOT_DIR, yaml.accessPrivateKeyFile),
);
// TODO export const REFRESH_PUBLIC_KEY = readFileSync(join(ROOT_DIR, yaml.refreshPublicKeyFile));
// TODO export const REFRESH_PRIVATE_KEY = readFileSync(join(ROOT_DIR, yaml.refreshPrivateKeyFile));
