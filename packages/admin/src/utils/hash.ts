import getHash from "@emotion/hash";

function hashClassNames(classNaems: Array<string>) {
  const classNamesMap = new Map(
    classNaems.map((className) => {
      return [
        className,
        `css-${getHash(Math.random().toString())}-${className}`,
      ];
    }),
  );

  return Object.fromEntries(classNamesMap);
}

export { hashClassNames };
