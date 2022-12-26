import { apiFunctionMutation } from "../index";
import { SignInRequest, SignInResponse } from "./userApi.typings";
import { HTTP } from "../../types/http";

export const userApi = {
  signIn: apiFunctionMutation<SignInRequest, SignInResponse>('post', HTTP.signIn),
}