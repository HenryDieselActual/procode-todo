import { Reducer } from 'redux';
import { deleteTodoAction, markCompleteAction, markIncompleteAction } from 'types/actionTypes';
import { incomplete } from 'types/storeType';

const initialState: incomplete = [];

const inCompleteReducer: Reducer<incomplete, deleteTodoAction | markCompleteAction | markIncompleteAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'MARK_INCOMPLETE':
      return [...state, action.todo];
    case 'DELETE_TODO':
    case 'MARK_COMPLETE':
      return [...state.filter((todo) => todo !== action.todo)];
    default:
      return [...state];
  }
};

export default inCompleteReducer;
