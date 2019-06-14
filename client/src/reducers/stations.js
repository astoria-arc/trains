import {
    RECEIVE_STATIONS,
    SELECT_STATION,
} from '../constants';

import { createReducer } from './createReducer';

const initialState = {
    stations: [],
    selectedStation: "R01",
};

export default createReducer(initialState, {
    [RECEIVE_STATIONS]: (state, payload) =>
        Object.assign({}, state, {
            stations: payload
        }),
    [SELECT_STATION]: (state, payload) =>
        Object.assign({}, state, {
            selectedStation: payload
        }),
});


