import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../css/LoginComponent.css';
import { useInput } from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { signIn } from '../redux/reducers/userReducer/userReducer';
import { showError } from '../utils/showError';
import { Errors } from "../types";

const LoginComponent = () => {
  const [login, setLogin] = useInput('');
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(state => state.user.auth.isLoading);
  const userInfo = useAppSelector(state => state.user.userInfo);
  const navigation = useNavigate();

  const loginAction = () => {
    dispatch(signIn({login}))
      .unwrap()
      .catch(() => showError(Errors.SERVER_ERROR));
  };

  useEffect(() => {
    if (userInfo) {
      navigation(`/user/${userInfo.role}`);
    }
  }, [userInfo]);
  return (
    <>
      <div className="LoginComponent">
        <TextField
          inputProps={{pattern: '[a-z]{1,15}'}}
          label="Login"
          variant="outlined"
          value={login}
          onChange={setLogin}
          margin="dense"
          required
        />
        <Button
          id="login_button"
          className="LoginComponent__Button"
          variant="contained"
          onClick={loginAction}
          disabled={isAuthLoading}
        >
          {isAuthLoading ? <CircularProgress/> : 'Войти'}
        </Button>
      </div>
    </>
  );
};

export { LoginComponent };
