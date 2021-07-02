import { combineReducers } from 'redux';

import pizzas from './pizzas';
import filters from './filters';

const rootReducer = combineReducers({
  pizzas,
  filters,
});

export default rootReducer;
