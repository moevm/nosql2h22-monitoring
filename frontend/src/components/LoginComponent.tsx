import React from "react";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { auntification } from "../functions/http/auntification";

import "../css/LoginComponent.css";

interface ILoginComporentProps {}

const LoginComponent: React.FC<ILoginComporentProps> = ({}) => {
  const [login, setLogin] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const navigation = useNavigate();
  // const [variant, setVariant] = React.useState<string>("outlined")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const loginAction = () => {
    console.log(login);
    if (auntification(login)) {
      navigation(`/user/${login}`);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className="LoginComponent">
        <TextField
          error={error}
          required
          inputProps={{ pattern: "[a-z]{1,15}" }}
          id="login_text_field"
          label="Login"
          variant="outlined"
          value={login}
          onChange={handleChange}
          margin="dense"
        />
        <Button
          id="login_button"
          className="LoginComponent__Button"
          variant="contained"
          onClick={loginAction}
        >
          Sign in
        </Button>
      </div>
    </>
  );
};

export { LoginComponent };
