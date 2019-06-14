import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import trains from './trains';
import stations from './stations';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  trains,
  stations,
})

export default rootReducer;
