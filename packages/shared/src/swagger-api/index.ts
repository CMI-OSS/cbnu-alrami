import { generate } from "openapi-typescript-codegen";

import * as spec from "./spec.json";

generate({
  input: spec,
  output: `${__dirname}/generated`,
  httpClient: "axios",
  useUnionTypes: true,
});
