import { createSelector } from '@ngrx/store';
// import { AccountInfo } from '@azure/msal-browser';

import { StoreInterface } from '../interfaces';

const selectFeature = (state: StoreInterface) => state.user;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectUser = createSelector(selectFeature, (user: any) => user);
