import history from '../history'
import {
    RECEIVE_STATIONS,
    SELECT_STATION,
} from '../constants/index';
import { push } from 'react-router-redux';

import { getTrains } from './trains';

export function getStations() {
   return (dispatch, getState) => {
     return fetch('/api/v1/stations', {
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
      dispatch({type: RECEIVE_STATIONS, payload: json})
    })
  }
}

export function selectStation(station) {
   return (dispatch, getState) => {
      dispatch({type: SELECT_STATION, payload: station})
      dispatch(getTrains(station))
   }
}

