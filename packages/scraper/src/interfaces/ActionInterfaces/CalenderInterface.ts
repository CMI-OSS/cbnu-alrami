import { ActionType } from 'typesafe-actions'
import { SUCCESS_CALENDER, FAIL_CALENDER } from '../../actions/types'

export interface SuccessType {
  type: typeof SUCCESS_CALENDER,
}

export interface FailType{
  type: typeof FAIL_CALENDER,
}

export type CalenderAction =
  SuccessType|FailType;

export interface CalenderState {
  "calender/success": boolean;
}
