import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { TreeRepository } from "typeorm";

import {
  NotFoundBoardException,
  NotFoundParentBoardException,
} from "./board.exception";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";
import { SubscribeBoard } from "./entities/subscribe-board.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: TreeRepository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto & { id?: number }) {
    const parentBoard =
      createBoardDto.parentBoardId &&
      (await this.findOne(createBoardDto.parentBoardId));

    const board = this.boardRepository.create({
      ...createBoardDto,
      ...(parentBoard && { parent: parentBoard }),
    });

    return this.boardRepository.save(board);
  }

  findByIds(ids: number[]) {
    return this.boardRepository.createQueryBuilder().whereInIds(ids).getMany();
  }

  findAll() {
    return this.boardRepository.findTrees({
      relations: [ "children" ],
    });
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { parent: true, children: true },
    });
    if (!board) throw new NotFoundBoardException();

    return board;
  }

  async getBoardsWithSubscribe(boards: Board[], user?: User) {
    return Promise.all(
      boards.map(async (board) => {
        const { children } = board;
        const isLeaf = !children?.length;

        if (isLeaf) {
          return this.getBoardWithSubscribe(board, user);
        }

        return {
          ...board,
          children: await this.getBoardsWithSubscribe(children, user),
        };
      }),
    );
  }

  async findSubscribeBoards(user: User) {
    const boards = await this.boardRepository.find({
      where: {
        subscribes: {
          user: {
            id: user.id,
          },
        },
      },
      relations: { parent: true, children: true },
    });

    return this.getBoardsWithSubscribe(boards, user);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    try {
      if (typeof updateBoardDto.parentBoardId !== "undefined")
        await this.findOne(updateBoardDto.parentBoardId);
    } catch (error) {
      throw new NotFoundParentBoardException();
    }

    return this.boardRepository.update(id, updateBoardDto);
  }

  async remove(id: number) {
    const board = await this.findOne(id);

    return this.boardRepository.remove(board);
  }

  async subscribe(id: number, user: User) {
    const { board, subscribe } = await this.getSubscribeBoard(id, user);

    if (subscribe) {
      throw new ConflictException();
    }

    const newSubscribe = { user, board } as SubscribeBoard;

    board.subscribes = board.subscribes
      ? [ ...board.subscribes, newSubscribe ]
      : [ newSubscribe ];

    return !!board.save();
  }

  async unsubscribe(id: number, user: User) {
    const { subscribe } = await this.getSubscribeBoard(id, user);

    if (!subscribe) {
      throw new NotFoundException();
    }

    return !!subscribe.remove();
  }

  async notice(id: number, user: User) {
    const { subscribe } = await this.getSubscribeBoard(id, user);

    if (!subscribe) {
      throw new NotFoundException();
    }
    subscribe.notice = true;

    return !!subscribe.save();
  }

  async unnotice(id: number, user: User) {
    const { subscribe } = await this.getSubscribeBoard(id, user);

    if (!subscribe) {
      throw new NotFoundException();
    }
    subscribe.notice = false;

    return !!subscribe.save();
  }

  async getSubscribeBoard(id: number, user: User) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { subscribes: true },
    });
    if (!board) throw new NotFoundBoardException();

    const subscribe = board.subscribes?.find(
      (subscribe) => subscribe.user.id === user.id,
    );

    return { board, subscribe };
  }

  async getBoardWithSubscribe(board: Board, user?: User) {
    if (!user) {
      return {
        ...board,
        isSubscribe: false,
        isNotice: false,
      };
    }

    const { subscribe } = await this.getSubscribeBoard(board.id, user);

    return {
      ...board,
      isSubscribe: !!subscribe,
      isNotice: !!subscribe?.notice,
    };
  }
}
