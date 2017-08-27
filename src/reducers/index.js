// Dependencies
import { combineReducers } from 'redux';

// Reducers
import DeliveriesReducer from './reducer_deliveries';

const rootReducer = combineReducers({
  deliveries: DeliveriesReducer
});

export default rootReducer;
