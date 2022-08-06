import { SetMetadata } from "@nestjs/common";

import { Authority } from "../constants/enums";

export const AUTHORITY_KEY = "authorities";
export const Authorities = (...authorities: Authority[]) => {
  return SetMetadata(AUTHORITY_KEY, authorities);
};
