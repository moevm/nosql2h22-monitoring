import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "./userReducer.typings";
import { getAsyncActionMutation } from "../../utils/getAsyncAction";
import { userApi } from "../../../api/userApi/userApi";

const initialState: UserReducerState = {
  auth: {
    isLoading: false
  },
  userInfo: null
};

export const signIn = getAsyncActionMutation('auth/signIn', userApi.signIn);

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.auth.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.auth.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.auth.isLoading = false;
      })
  }
});

export const {reducer: userReducer} = userSlice;