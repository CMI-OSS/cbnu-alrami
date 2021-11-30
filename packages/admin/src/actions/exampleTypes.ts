export const SW = "example/SW" as const;
export const MIS = "example/MIS" as const;
export const PSY = "example/PSY" as const;

export const CHANGE_SCENARIO = "noticeScraper/CHANGE_SCENARIO" as const;
export const PAUSE_SCENARIO = "noticeScraper/PAUSE_SCENARIO" as const;

type swType = { type: typeof SW; payload: null };
type misType = { type: typeof MIS; payload: null };
type psyType = { type: typeof PSY; payload: null };

export type exampleAction = swType | misType | psyType;

export type exampleState = {
  exampleState: string;
  loading: boolean;
  error: Error | null;
  data: null;
};
