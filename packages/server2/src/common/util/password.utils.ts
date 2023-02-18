import { createHmac } from "crypto";

import configuration from "src/config/configuration";

export class PasswordUtils {
  async encrypt(password: string): Promise<string> {
    return createHmac("sha256", configuration.password.salt)
      .update(password)
      .digest("hex");
  }
}
