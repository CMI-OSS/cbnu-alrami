import { readFileSync } from "fs";
import { join } from "path";
import { Admin } from "src/@entities/admin.entity";
import { User } from "src/@entities/user.entity";
import configuration from "src/@config/configuration";

const yaml = configuration();
export const ROOT_DIR = join(__dirname, "../../");
// export const ACCESS_PUBLIC_KEY = readFileSync(join(ROOT_DIR, yaml.accessPublicKeyFile));
export const ACCESS_PRIVATE_KEY = readFileSync(
  join(ROOT_DIR, yaml.accessPrivateKeyFile),
);
// export const REFRESH_PUBLIC_KEY = readFileSync(join(ROOT_DIR, yaml.refreshPublicKeyFile));
// export const REFRESH_PRIVATE_KEY = readFileSync(join(ROOT_DIR, yaml.refreshPrivateKeyFile));
export const MODEL = {
  Admin,
  User,
};
