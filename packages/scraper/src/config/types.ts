export type Configutation = {
  env: "local" | "dev" | "production";
  headless: boolean;
  scraperLoginId: string;
  scraperLoginPassword: string;
};
