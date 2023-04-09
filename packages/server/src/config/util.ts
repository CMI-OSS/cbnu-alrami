import configuration from "./configuration";

const isServerProduction = configuration.server.env === "production";

export default isServerProduction;
