import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "./userReducer.typings";
import { getAsyncActionMutation, getAsyncActionQuery } from "../../utils/getAsyncAction";
import { userApi } from "../../../api/userApi/userApi";
import { patientApi } from "../../../api/patientApi/patientApi";

const initialState: UserReducerState = {
  auth: {
    isLoading: false
  },
  userInfo: null
};

export const signIn = getAsyncActionMutation('auth/signIn', userApi.signIn);

export const getPatientQuizById = getAsyncActionQuery('auth/getPatientQuiz', patientApi.getQuiz);

export const sendSignDocument = getAsyncActionMutation('auth/sendSignDocument', patientApi.sendSignDocument);

export const sendPatientAnswers = getAsyncActionMutation('auth/sendPatientAnswers', patientApi.sendQuizAnswers);

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