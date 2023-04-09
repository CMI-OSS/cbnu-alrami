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

  async getBoardsWithSubscribe(
    boards: Board[],
    subscribeBoards: Board[],
    user?: User,
  ) {
    return Promise.all(
      boards.map(async (board) => {
        const { children } = board;
        const isLeaf = !children?.length;

        if (isLeaf) {
          return this.getBoardWithSubscribe(board, subscribeBoards, user);
        }

        return {
          ...board,
          children: await this.getBoardsWithSubscribe(
            children,
            subscribeBoards,
            user,
          ),
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

    const subscribeBoards = await this.getSubscribeBoards(user);

    return this.getBoardsWithSubscribe(boards, subscribeBoards, user);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    let parentBoard: null | Board = null;

    const { parentBoardId, ...updateBoard } = updateBoardDto;

    try {
      if (parentBoardId) {
        const targetBoard = await this.findOne(id);
        parentBoard = await this.findOne(parentBoardId);

        targetBoard.parent = parentBoard;
        this.boardRepository.save(targetBoard);
      }
    } catch (error) {
      console.log({ error });
      throw new NotFoundParentBoardException();
    }

    return this.boardRepository.update(id, updateBoard);
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

    return !!(await this.boardRepository.save(board));
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

  async getSubscribeBoards(user: User) {
    const boards = await this.boardRepository.find({
      where: { subscribes: { user: { id: user.id } } },
      relations: { subscribes: true },
    });

    return boards;
  }

  async getBoardWithSubscribe(
    board: Board,
    subscribeBoards: Board[],
    user?: User,
  ) {
    if (!user) {
      return {
        ...board,
        isSubscribe: false,
        isNotice: false,
      };
    }

    const targetBoard = subscribeBoards.find(
      (_board) => _board.id === board.id,
    );

    const subscribe = targetBoard?.subscribes?.find(
      (subscribeUser) => subscribeUser.user.id === user.id,
    );

    return {
      ...board,
      isSubscribe: !!subscribe,
      isNotice: !!subscribe?.notice,
    };
  }

  async getNoticeUsers(boardId?: number): Promise<User[]> {
    if (!boardId) return [];

    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
        subscribes: true,
      },
      relations: {
        subscribes: true,
      },
    });

    return (
      board?.subscribes
        ?.filter(({ notice, user }) => !!notice && user.fcmToken)
        .map(({ user }) => user) ?? []
    );
  }
}
