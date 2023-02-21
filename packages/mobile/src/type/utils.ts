export type GetParams<T> = T extends (...args: infer P) => any ? P[0] : never;
