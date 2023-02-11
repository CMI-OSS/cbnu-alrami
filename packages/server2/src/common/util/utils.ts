import configuration from "src/config/configuration";

export const isDev = configuration.server.env === "dev";
