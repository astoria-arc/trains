import {
    RECEIVE_TRAINS,
    RECEIVE_DIRECTION,
} from '../constants';

import { createReducer } from './createReducer';

const initialState = {
    trains: [],
    direction: localStorage.getItem('direction') || "Manhattan",
};

export default createReducer(initialState, {
    [RECEIVE_TRAINS]: (state, payload) =>
        Object.assign({}, state, {
            trains: payload
        }),
    [RECEIVE_DIRECTION]: (state, payload) =>
        Object.assign({}, state, {
            direction: payload
        }),
});

