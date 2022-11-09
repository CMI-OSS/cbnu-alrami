/* eslint-disable no-param-reassign */
import { useCallback } from "react";

export const useTextAreaAutoResize = (
  current: React.MutableRefObject<HTMLElement | null>["current"],
) =>
  useCallback(() => {
    if (current) {
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;
    }
  }, [ current ]);
