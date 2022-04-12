import { NotFoundException } from "@nestjs/common";

export type Error = {
    message: string;
}

// // 하단 Errors로 상수 처리 -> Key값으로 예외 핸들링 
// type ErrorObject = {
//     [key: string]: Error;
// };

export const Errors = {
    NOT_FOUND: new NotFoundException('찾을 수 없는 테스트'),
}