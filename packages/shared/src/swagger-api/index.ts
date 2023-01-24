import axios from "axios";
import { generate } from "openapi-typescript-codegen";

const apiServer = {
  local: "http://localhost:3001/api-docs-json",
  dev: "https://dev-server2.cmi.kro.kr/api-docs-json",
};

axios.get(apiServer[process.env.SERVER]).then((res) => {
  const spec = res.data;

  generate({
    input: spec,
    output: `${__dirname}/generated`,
    httpClient: "axios",
    useOptions: true,
  });
});
