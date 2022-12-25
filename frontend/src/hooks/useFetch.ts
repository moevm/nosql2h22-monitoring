import { useEffect, useReducer } from 'react'
import { BASE_URL, HTTP } from "../types/http";

interface State<T> {
  data?: T
  error?: Error
}

type Action<T> = { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error };

export const useFetch = <T = unknown>(url: HTTP, query?: string, onMount = true)
  :[State<T>, (options?: RequestInit) => void]=> {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState};
      case 'fetched':
        return {...initialState, data: action.payload};
      case 'error':
        return {...initialState, error: action.payload};
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async (options?: RequestInit) => {
    dispatch({type: 'loading'});
    try {
      const urlWithQuery = query ? url + query : url;
      const response = await fetch(BASE_URL + urlWithQuery, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      dispatch({type: 'fetched', payload: data});
    } catch (error) {

      dispatch({type: 'error', payload: error as Error});
    }
  }

  useEffect(() => {
    onMount && fetchData();
  }, []);

  return [state, fetchData];
}