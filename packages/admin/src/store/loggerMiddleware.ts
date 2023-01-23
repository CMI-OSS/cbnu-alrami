const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  // redux-logger 라이브러리로 대체 가능
  // console.log("PREV STATE:", store.getState());
  // console.log("action:", action);
  const result = next(action);
  // console.log("NEXT STATE:", store.getState());
  return result;
};

export default loggerMiddleware;
