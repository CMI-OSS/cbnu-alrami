import { Injectable } from "@nestjs/common";
import { Subscribe } from "src/commons/entities/subscribe.entity";

import { SubscribeRepository } from "./subscribe.repository";

@Injectable()
export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async findByUser(userId: number): Promise<Subscribe[]> {
    const subscribe = await this.subscribeRepository.find({
      where: {
        user: userId,
      },
      relations: [ "user", "board" ],
    });
    return subscribe;
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
