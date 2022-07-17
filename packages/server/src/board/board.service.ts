import { Injectable } from "@nestjs/common";
import { Errors } from "src/commons/exception/exception.global";

import { Board } from "../commons/entities/board.entity";
import { BoardRepository } from "./board.repository";
import { BoardCreateDto } from "./dto/board.create.dto";
import { BoardUpdateDto } from "./dto/board.update.dto";

const {
  NO_DATA_IN_DB,
  DUPLICATE_BOARD_NAME,
  DUPLICATE_BOARD_URL,
  BOARD_ID_NOT_FOUND,
} = Errors;

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(boardCreateDto: BoardCreateDto) {
    if ((await this.boardRepository.count({ name: boardCreateDto.name })) > 0)
      throw DUPLICATE_BOARD_NAME;
    if ((await this.boardRepository.count({ url: boardCreateDto.url })) > 0)
      throw DUPLICATE_BOARD_URL;

    const result = await this.boardRepository.save(boardCreateDto);
    return result;
  }

  async findByName(name: string) {
    const board = await this.boardRepository.findOne({ name });
    if (typeof board === "undefined") throw NO_DATA_IN_DB;
    return board;
  }

  async findByUrl(url: string) {
    const board = await this.boardRepository.findOne({ url });
    if (typeof board === "undefined") throw NO_DATA_IN_DB;
    return board;
  }

  async findAll(): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find();
    if (!Array.isArray(boards) || boards.length === 0) throw NO_DATA_IN_DB;
    return boards;
  }

  async findById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ id });
    if (!board) throw BOARD_ID_NOT_FOUND;
    return board;
  }

  /*
   * 기존 board 객체의 name, url은 중복체크에서 걸리지 않지만, 다른 board의 name, url은 중복체크에 걸리도록 처리
   */
  async update(id: number, boardUpdateDto: BoardUpdateDto) {
    const { name } = boardUpdateDto;
    const { url } = boardUpdateDto;

    if ((await this.boardRepository.existsByIdAndName(id, name)) > 0)
      throw DUPLICATE_BOARD_NAME;
    if ((await this.boardRepository.existsByIdAndUrl(id, url)) > 0)
      throw DUPLICATE_BOARD_URL;

    const board = await this.findById(id);
    const newBoard = Object.assign(board, boardUpdateDto);

    const result = await this.boardRepository.save(newBoard);
    return result;
  }

  async remove(id: number): Promise<boolean> {
    await this.findById(id);
    await this.boardRepository.delete({ id });
    return true;
  }
}
