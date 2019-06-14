import history from '../history'
import {
    RECEIVE_TRAINS,
    RECEIVE_DIRECTION,
} from '../constants/index';
import { push } from 'react-router-redux';

export function getTrains(stationId="R05") {
   return (dispatch, getState) => {
     return fetch(`/api/v1/trains?station=${stationId}`, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       }
     })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch({type: RECEIVE_TRAINS, payload: json})
    })
  }
}

export function updateDirection(direction) {
   return (dispatch, getState) => {
      dispatch({type: RECEIVE_DIRECTION, payload: direction})
   }
}
