export const SCENARIO_STATE = {
  WAIT: "WAIT",
  RUNNING: "RUNNING",
  STOPPED: "STOPPED",
  ERROR: "ERROR",
} as const;

type SCENARIO_STATE = typeof SCENARIO_STATE[keyof typeof SCENARIO_STATE];

export class Scenario<T> {
  state: SCENARIO_STATE = SCENARIO_STATE.STOPPED;
  jsScript?: T;
  constructor(jsScript: T) {
    this.jsScript = jsScript;
  }
}
