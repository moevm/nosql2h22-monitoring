import { apiFunctionMutation } from '../index';
import { HTTP } from '../../types/http';

import { SignInRequest, SignInResponse } from './userApi.typings';

export const userApi = {
  signIn: apiFunctionMutation<SignInRequest, SignInResponse>('post', HTTP.signIn),
};