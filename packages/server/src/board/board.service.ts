import { Injectable } from "@nestjs/common";
import { Errors } from "src/common/exception/exception.global";
import { BoardRepository } from "./board.repository";
import { BoardCreateDto } from "./dto/board.create.dto";
import { Board } from "src/@entities/board.entity";
import { DeleteResult } from "typeorm";
import { BoardUpdateDto } from "./dto/board.update.dto";

const { NO_DATA_IN_DB, DUPLICATE_BOARD_NAME, DUPLICATE_BOARD_URL } = Errors;

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(boardCreateDto: BoardCreateDto) {
    if ((await this.boardRepository.count({ name: boardCreateDto.name })) > 0)
      throw DUPLICATE_BOARD_NAME;
    if ((await this.boardRepository.count({ url: boardCreateDto.url })) > 0)
      throw DUPLICATE_BOARD_URL;

    return await this.boardRepository.save(boardCreateDto);
  }

  async findByName(name: string) {
    const board = await this.boardRepository.findOne({ name: name });
    if (board === null || typeof board === "undefined") throw NO_DATA_IN_DB;
    return board;
  }

  async findByUrl(url: string) {
    const board = await this.boardRepository.findOne({ url: url });
    if (board === null || typeof board === "undefined") throw NO_DATA_IN_DB;
    return board;
  }

  async findAll(): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find();
    if (!Array.isArray(boards) || boards.length == 0) throw NO_DATA_IN_DB;
    return boards;
  }

  async findById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ id });
    if (!board) throw NO_DATA_IN_DB;
    return board;
  }

  /*
   * 기존 board 객체의 name, url은 중복체크에서 걸리지 않지만, 다른 board의 name, url은 중복체크에 걸리도록 처리
   */
  async update(id: number, boardUpdateDto: BoardUpdateDto) {
    const name = boardUpdateDto.name;
    const url = boardUpdateDto.url;

    if ((await this.boardRepository.existsByIdAndName(id, name)) > 0)
      throw DUPLICATE_BOARD_NAME;
    if ((await this.boardRepository.existsByIdAndUrl(id, url)) > 0)
      throw DUPLICATE_BOARD_URL;

    const board = await this.findById(id);
    const newBoard = Object.assign(board, boardUpdateDto);

    return await this.boardRepository.save(newBoard);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.boardRepository.delete({ id });
  }
}
