import axios from "axios";
import { generate } from "openapi-typescript-codegen";

import { apiServer } from "../constant";

axios.get(apiServer[process.env.SERVER]).then((res) => {
  const spec = res.data;

  generate({
    input: spec,
    output: `${__dirname}/generated`,
    useOptions: true,
  });
});
