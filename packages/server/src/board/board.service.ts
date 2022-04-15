import { Injectable } from "@nestjs/common";
import { Errors } from "src/common/exception/exception.global";
import { UnauthorizedException } from "src/common/exception/exception.response";

const { EXAMPLE_NOT_FOUND, TEST_NOT_VALIDATE } = Errors;

@Injectable()
export class BoardService {
  async test(id: number): Promise<boolean> {
    // nestjs/common에서 제공하는 http exception을 사용하는 경우
    if (id > 10) throw EXAMPLE_NOT_FOUND;
    // 커스텀 exception을 만들어 사용하는 경우
    else if (id > 6 && id < 9)
      throw new UnauthorizedException(TEST_NOT_VALIDATE);
    return true;
  }
}
