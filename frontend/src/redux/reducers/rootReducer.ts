import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './userReducer/userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
});