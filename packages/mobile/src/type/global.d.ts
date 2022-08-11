declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare interface Window {
  ReactNativeWebView: any;
}
