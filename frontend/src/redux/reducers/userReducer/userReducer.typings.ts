import { User } from "../../../types";

export interface UserReducerState {
  auth: {
    isLoading: boolean;
  },
  userInfo: User | null;
}