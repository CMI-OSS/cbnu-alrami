import { Configutation } from "./types";

const configuration: Configutation = {
  server: {
    host: "",
    port: 0,
  },
  db: {
    type: "mysql",
    host: "",
    username: "",
    password: "",
    port: 0,
    database: "",
    synchronize: false,
  },
  aws: {
    s3: {
      accessKeyId: "",
      secretAccessKey: "",
      region: "",
      bucketName: "",
    },
  },
};

export default configuration;
