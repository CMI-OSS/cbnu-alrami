import configuration from "src/config/configuration";

export const IS_TEST = process.env.NODE_ENV === "test";
export const IS_DEV = configuration.env === "dev";
