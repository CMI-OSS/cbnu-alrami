import axios, { isAxiosError } from "../axios";
import { CMIError } from "../types";

const endpoint = "/boards";

export interface GetArticlesApiInput {
  boardId: number; // 게시판 아이디
  pageNo?: number; // 현재 페이지 (default 1)
  pageSize?: number; // 한 페이지안에 포함할 리스트 사이즈 (default:15)
}

interface GetArticlesApiOutput_Success {
  type: "GetArticlesApiOutput_Success";
  pagination: {
    isEnd: boolean;
    pageNumber: number;
    totalItemCount: number;
    totalPageCount: number;
  };
  contents: {
    id: number;
    board: {
      id: number;
      name: string;
      parent: {
        id: number;
        name: string;
      };
    };
    title: string;
    hits: number;
    scraps: number;
    date: string;
    updatedAt: string;
  }[];
}

interface GetArticlesApiOutput_Error extends CMIError {
  type: "GetArticlesApiOutput_Error";
}

export type GetArticlesApiOutput =
  | GetArticlesApiOutput_Success
  | GetArticlesApiOutput_Error;

export const getArticles = async (
  input: GetArticlesApiInput,
): Promise<GetArticlesApiOutput> => {
  let result;

  try {
    result = await axios.get(`${endpoint}/${input.boardId}/articles`, {
      params: input,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        type: "GetArticlesApiOutput_Error",
        ...(error.response?.data as CMIError),
      };
    }

    return {
      type: "GetArticlesApiOutput_Error",
      error: {
        message: "알 수 없는 에러",
      },
    };
  }

  return {
    type: "GetArticlesApiOutput_Success",
    ...result?.data,
  };
};
