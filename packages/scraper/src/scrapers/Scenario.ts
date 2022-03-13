export class Scenario<T> {
  title = "";
  jsScript?: T;

  constructor(title: string, jsScript: T) {
    this.title = title;
    this.jsScript = jsScript;
  }
}
