export type Configuration = {
  env: "local" | "dev" | "production";
  headless: boolean;
  scraperLoginId: string;
  scraperLoginPassword: string;
};
