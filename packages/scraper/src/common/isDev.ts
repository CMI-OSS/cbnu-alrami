export const IS_TEST = process.env.NODE_ENV === "test";
export const IS_DEV = process.env.NODE_ENV === "development" || IS_TEST;
