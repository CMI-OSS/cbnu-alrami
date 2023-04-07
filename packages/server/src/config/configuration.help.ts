import { Configuration } from "./types";

const configuration: Configuration = {
  server: {
    env: "dev",
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
  weather: {
    key: "",
  },
  fcm: {
    key: "",
    aos: "",
    ios: "",
  },
  jwt: {
    secret: "",
    expire: "",
  },
  holiday: {
    key: "",
    url: "",
  },
  password: {
    salt: "",
  },
};

export default configuration;
