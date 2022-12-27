import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getAsyncActionMutation,
  getAsyncActionQuery,
} from "../../utils/getAsyncAction";
import { userApi } from "../../../api/userApi/userApi";
import { patientApi } from "../../../api/patientApi/patientApi";
import { Doctor } from "../../../types";

import { UserReducerState } from "./userReducer.typings";

const initialState: UserReducerState = {
  auth: {
    isLoading: false,
  },
  userInfo: null,
};

export const signIn = getAsyncActionMutation("auth/signIn", userApi.signIn);

export const getPatientQuizById = getAsyncActionQuery(
  "auth/getPatientQuiz",
  patientApi.getQuiz
);

export const getPatientById = getAsyncActionQuery(
  "auth/getPatientById",
  patientApi.getPatient
);

export const sendSignDocument = getAsyncActionMutation(
  "auth/sendSignDocument",
  patientApi.sendSignDocument
);

export const sendPatientAnswers = getAsyncActionMutation(
  "auth/sendPatientAnswers",
  patientApi.sendQuizAnswers
);

export const getPatientRecommendations = getAsyncActionQuery(
  "auth/rec",
  patientApi.getRecommendations
);

export const setDoctor = getAsyncActionMutation(
  "auth/setDoctor",
  patientApi.setDoctor
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateDoctor(state, action: PayloadAction<[Doctor]>) {
      state.userInfo!.doctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.auth.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.auth.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.auth.isLoading = false;
      });
  },
});

export const { updateDoctor } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
