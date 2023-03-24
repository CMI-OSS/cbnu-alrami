export type Configutation = {
  server: {
    env: "dev" | "production";
    host: string;
    port: number;
  };
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
  };
  aws: {
    s3: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
      bucketName: string;
    };
  };
  weather: {
    key: string;
  };
  fcm: {
    key: string;
    aos: string;
    ios: string;
  };
  jwt: {
    secret: string;
    expire: string;
  };
  holiday: {
    key: string;
    url: string;
  };
  password: {
    salt: string;
  };
};
