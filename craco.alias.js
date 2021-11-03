// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  "@admin": path.resolve(__dirname, "packages/admin/src/"),
  "@scraper": path.resolve(__dirname, "packages/scraper/src/"),
  "@server": path.resolve(__dirname, "packages/server/src/"),
  "@shared": path.resolve(__dirname, "packages/shared/src/"),
};
