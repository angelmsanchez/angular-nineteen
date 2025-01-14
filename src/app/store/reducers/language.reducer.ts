import { createReducer, on } from '@ngrx/store';

import { setLanguage } from '../actions/index';

const initialState = 'es';
export const languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => language)
);
