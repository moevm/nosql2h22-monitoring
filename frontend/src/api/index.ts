import { AxiosResponse } from 'axios';

import axios from '../axios';
import { QueryParams } from "../types";
import { HTTP } from "../types/http";

type Method = 'post' | 'put' | 'delete' | 'patch';

export type QueryConfig = {
  params: QueryParams;
};

export const apiFunctionQuery = <TRes>(pathName: HTTP) => {
  return (config?: QueryConfig): Promise<AxiosResponse<TRes>> => axios.get<TRes>(pathName, config);
};

export const apiFunctionMutation = <TReq, TRes>(method: Method, pathName: HTTP) => {
  return (data: TReq): Promise<AxiosResponse<TRes>> => axios(pathName, {data, method});
};