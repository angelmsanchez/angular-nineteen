import { createAction, props } from '@ngrx/store';
// import { AccountInfo } from '@azure/msal-browser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUser = createAction('[App] Set User', props<any>());
export const setLanguage = createAction(
  '[App] Set language',
  props<{ language: string }>()
);
