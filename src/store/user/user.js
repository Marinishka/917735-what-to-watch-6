import {AuthorizationStatus} from '../../const';
import {requireAuthorization} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload
    };
  });
});

export {user};
