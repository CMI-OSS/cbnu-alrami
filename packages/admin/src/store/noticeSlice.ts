import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import http from "@admin/common/http";

const name = "noticeScraper"; // 액션 타입 문자열의 prefix로 들어간다. ex) "noticeScraper/changeScenario"

const getScraper = createAsyncThunk(
  `${name}/getScraper`, // 액션 이름을 정의합니다.
  async (title: string, thunkAPI) => {
    try {
      const response = await http.get(title);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
    // 리턴 타입은 Promise
  },
);

type Props = {
  notice: {
    title: string;
    group: string;
    status: string;
  };
  isLoading: boolean;
};

const initialState: Props[] = [];

export const noticeSlice = createSlice({
  name,
  initialState,
  reducers: {
    // 리듀서 맵
    addScenario: (
      // 리듀서 함수
      state,
      action: PayloadAction<{
        title: string;
        group: string;
        status: string;
      }>,
    ) => {
      state.push({ notice: action.payload, isLoading: false }); // 상태 변경 예시 1
    },
    changeScenario: (
      // 리듀서 함수
      state,
      action: PayloadAction<{
        title: string;
        group: string;
        status: string;
      }>,
    ) => {
      state.forEach((script) => {
        // 상태 변경 예시 2
        const scriptCopy = script; // no-param-reassign lint
        if (scriptCopy.notice.title === action.payload.title)
          scriptCopy.notice.status = action.payload.status; // 리듀서에서 상태를 직접 바꿔준다.
      });
    },
  },
  extraReducers: { // 액션을 따로 정의한 함수에 대한 리듀서를 정의 ex) thunk함수
    [getScraper.pending.type]: (state, action) => {
      // 호출 전
      state.forEach((script) => {
        const scriptCopy = script; // no-param-reassign lint
        scriptCopy.isLoading = true; // 리듀서에서 상태를 직접 바꿔준다.
      });
    },
    [getScraper.fulfilled.type]: (state, action) => {
      // 성공
      state.forEach((script) => {
        const scriptCopy = script; // no-param-reassign lint
        scriptCopy.isLoading = true; // 리듀서에서 상태를 직접 바꿔준다.
        if (scriptCopy.notice.title === action.payload.title)
          scriptCopy.notice.status = action.payload.status; // 리듀서에서 상태를 직접 바꿔준다.
      });
    },
    [getScraper.rejected.type]: (state, action) => {
      // 실패
      state.forEach((script) => {
        const scriptCopy = script; // no-param-reassign lint
        scriptCopy.isLoading = true; // 리듀서에서 상태를 직접 바꿔준다.
        if (scriptCopy.notice.title === action.payload.title)
          scriptCopy.notice.status = "장애"; // 리듀서에서 상태를 직접 바꿔준다.
      });
    },
  },
});
