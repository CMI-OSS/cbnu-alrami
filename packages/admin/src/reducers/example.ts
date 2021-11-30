import { scraperState } from "@admin/actions/scraperState";
import { exampleAction, SW, MIS, PSY } from "../actions/exampleTypes";

const initialState: scraperState = {
  example: {
    exampleState: "",
    loading: false,
    error: null,
    data: null,
  },
};

export default function example(
  state: scraperState = initialState,
  action: exampleAction,
) {
  switch (action.type) {
    case SW:
      return {
        ...state,
        example: {
          exampleState: "실행 중",
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case MIS:
      return {
        ...state,
        example: {
          exampleState: "장애",
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case PSY:
      return {
        ...state,
        example: {
          exampleState: "멈춤",
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    default:
      return state;
  }
}
