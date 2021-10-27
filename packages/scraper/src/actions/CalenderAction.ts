import { CalenderAction } from './../interfaces/ActionInterfaces/CalenderInterface';
import { RootState } from './../reducers/index';
import { SUCCESS_CALENDER, FAIL_CALENDER } from "./types";
import { ThunkAction } from "redux-thunk";
import axios from 'axios'

export function success_calender():ThunkAction<void,RootState,null, CalenderAction>{
  return async dispatch =>{
  try{
      const response = await axios.get(`https://api.github.com/users/kingyong9169`)
      dispatch({type: SUCCESS_CALENDER, payload: response.data});
      return Promise.resolve(response.data);
    } catch(err){
      return Promise.reject(err);
    }
  }
}

export function fail_calender():ThunkAction<void,RootState,null,CalenderAction>{
  return async dispatch =>{
  try{
      const response = await axios.get(`https://api.github.com/users/kingyong9169`)
      dispatch({type: FAIL_CALENDER, payload: response.data});
      return Promise.resolve(response.data);
    } catch(err){
      return Promise.reject(err);
    }
  }
}