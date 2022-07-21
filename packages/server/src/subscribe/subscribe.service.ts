import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardService } from "src/board/board.service";
import { Subscribe } from "src/commons/entities/subscribe.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";

import { SubscribeRepository } from "./subscribe.repository";

const { ALREADY_SUBSCRIBE_BOARD, NOT_SUBSCRIBED_BOARD } = Errors;

@Injectable()
export class SubscribeService {
  constructor(
    private readonly subscribeRepository: SubscribeRepository,
    private readonly boardService: BoardService,
  ) {}

  async create(user: User, boardId: number) {
    const board = await this.boardService.findById(boardId);

    // DESCRIBE: 요청한 유저가 board를 이미 구독 중인지 확인
    if (await this.subscribeRepository.existsByUserAndBoard(user.id, boardId))
      throw ALREADY_SUBSCRIBE_BOARD;

    // DESCRIBE: 구독과 알림 신청은 별개 -> 처음 구독했을 땐 알림 설정 false로
    const subscribe = Builder(Subscribe)
      .board(board)
      .user(user)
      .notice(false)
      .build();

    await this.subscribeRepository.save(subscribe);
    return "success";
  }

  async remove(user: User, boardId: number) {
    const board = await this.boardService.findById(boardId);

    // DESCRIBE: 요청한 유저가 board를 구독하고 있는지 확인
    const subscribe = await this.findByUserAndBoard(user.id, boardId);
    if (!subscribe) throw NOT_SUBSCRIBED_BOARD;

    // DESCRIBE: 이미 구독 중인 board라면 구독 해제
    await this.subscribeRepository.delete({ id: subscribe.id });
    return "success";
  }

  async findByUser(userId: number): Promise<Subscribe[]> {
    const subscribe = await this.subscribeRepository.find({
      where: {
        user: userId,
      },
      relations: [ "user", "board" ],
    });
    return subscribe;
  }

  async findBoardByUser(userId: number): Promise<number[]> {
    const boardIdList = await this.subscribeRepository.findBoardByUser(userId);
    // FIXME: 쿼리단에서 number array로 들고왔음 좋겠다
    const result = boardIdList.map(({ boardId }) => boardId);
    return result;
  }

  async findByUserAndBoard(
    userId: number,
    boardId: number,
  ): Promise<Subscribe> {
    const subscribe = await this.subscribeRepository.findOne({
      where: {
        user: userId,
        board: boardId,
      },
      relations: [ "user", "board" ],
    });
    return subscribe;
  }
}
