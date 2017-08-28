// Dependencies
import { combineReducers } from 'redux';

// Reducers
import deliveries from './reducer_deliveries';

const rootReducer = combineReducers({
  deliveries
});

export default rootReducer;
