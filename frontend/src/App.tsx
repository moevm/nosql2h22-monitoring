import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// import './App.css';
import {UserComponent} from "./components/UserComponents"
import {LoginComponent} from "./components/LoginComponent";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/:login" element={<UserComponent/>}>

          </Route>
          <Route path="/" element={<LoginComponent/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
