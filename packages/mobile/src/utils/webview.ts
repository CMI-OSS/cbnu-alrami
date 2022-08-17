import { getUA, isMobile } from "react-device-detect";

const CBNU_ALRAMI_APP_USER_AGENT = "cbnu-alrami-app";
const LOCALHOST = "http://localhost:3000/";

const isWebView = isMobile && getUA.indexOf(CBNU_ALRAMI_APP_USER_AGENT) > -1;
const isDev = window.location.href.indexOf(LOCALHOST) === 0;

export { isWebView, isDev };
