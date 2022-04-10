import { HttpStatus, NotFoundException } from "@nestjs/common";

export const errors = {
    NOT_FOUND: new NotFoundException('찾을 수 없는 테스트'),
}