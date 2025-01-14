import { createReducer, on } from '@ngrx/store';

import { setUser } from '../actions/index';

export const userReducer = createReducer(
  {},
  on(setUser, (state, user) => {
    return { ...user };
  })
);
