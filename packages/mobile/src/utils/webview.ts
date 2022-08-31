import { getUA, isIOS, isMobile } from "react-device-detect";

const CBNU_ALRAMI_APP_USER_AGENT = isIOS
  ? "cbnu_alrami_ios"
  : "cbnu_alrami_android";

const isWebView = isMobile && getUA.indexOf(CBNU_ALRAMI_APP_USER_AGENT) > -1;
const isDev = process.env.NODE_ENV === "development";

export { isWebView, isDev };
