import { getUA, isDesktop } from "react-device-detect";

import { isProduction } from "@shared/util";

const CBNU_ALRAMI_IOS_USER_AGENT = "cbnu_alrami_ios";
const CBNU_ALRAMI_ANDROID_USER_AGENT = "cbnu_alrami_android";

const isFromIosApp = getUA.includes(CBNU_ALRAMI_IOS_USER_AGENT);
const isFromAndroidApp = getUA.includes(CBNU_ALRAMI_ANDROID_USER_AGENT);

const isFromApp = isFromIosApp || isFromAndroidApp;

const isWebView = isFromApp;
const isDevOrWebview = !isProduction || isWebView;

export { isFromApp, isWebView, isDesktop, isDevOrWebview };
