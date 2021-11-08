import getHash from "@emotion/hash";

function cssHash() {
  return `css-${getHash(Math.random().toString())}`;
}

export { cssHash };
