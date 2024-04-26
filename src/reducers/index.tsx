import { combineReducers } from 'redux';

import complete from './completeReducers';
import incomplete from './incompleteReducers';

export default combineReducers({
  complete,
  incomplete,
});
