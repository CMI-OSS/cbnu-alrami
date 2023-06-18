import * as zlib from "zlib";

import { ValueTransformer } from "typeorm";

// 문자열 압축 함수
function compressString(input: string): string {
  const buffer = Buffer.from(input, "utf8");
  const compressedBuffer = zlib.gzipSync(buffer);
  const compressedString = compressedBuffer.toString("base64");
  return compressedString;
}

// 문자열 복호화 함수
function decompressString(input: string): string {
  const compressedBuffer = Buffer.from(input, "base64");
  const decompressedBuffer = zlib.gunzipSync(compressedBuffer);
  const decompressedString = decompressedBuffer.toString("utf8");
  return decompressedString;
}

class ContentTransformer implements ValueTransformer {
  to(value: string): string {
    return compressString(value);
  }

  from(value: string): string {
    return decompressString(value);
  }
}

export { ContentTransformer };
