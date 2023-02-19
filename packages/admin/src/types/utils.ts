export type PropsType<T> = T extends (...argument: infer Args) => unknown
  ? Args[0]
  : never;
