export type Configutation = {
  server: {
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
  };
};
