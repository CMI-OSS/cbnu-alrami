export type GetParams<T> = T extends (...args: infer P) => any ? P[0] : never;
export type ValueOf<T> = T[keyof T];
export type Keyof<T> = keyof T;
