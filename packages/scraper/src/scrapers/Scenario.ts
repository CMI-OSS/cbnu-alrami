export class Scenario<T> {
  jsScript?: T;

  constructor(jsScript: T) {
    this.jsScript = jsScript;
  }
}
