export const SCRIPT_STATE = {
  WAIT: "WAIT",
  RUNNING: "RUNNING",
  STOP: "STOP",
  ERROR: "ERROR",
} as const;

type SCRIPT_STATE = typeof SCRIPT_STATE[keyof typeof SCRIPT_STATE];

export class Script {
  state: SCRIPT_STATE = SCRIPT_STATE.STOP;
  jsScript: string = "";
}
