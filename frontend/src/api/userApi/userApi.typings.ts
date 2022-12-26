import { User } from '../../types';

export interface SignInRequest {
  login: string;
}

export type SignInResponse = User;
