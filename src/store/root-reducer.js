import {combineReducers} from 'redux';
import {data} from './data/data';
import {localState} from './local-state/local-state';
import {user} from './user/user';

export const NameSpace = {
  DATA: `DATA`,
  LOCAL: `LOCAL`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.LOCAL]: localState,
  [NameSpace.USER]: user
});
