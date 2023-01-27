import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from "react-validation/build/button";

import '../Header/HeaderLogin.scss';
import './Login.scss';
import AuthService from "../../services/auth.service";
import HeaderLogin from "../Header/HeaderLogin.js";


export const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/patientsList");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderLogin />

      <style>{'body {  background-color: var(--background); }'}</style>

      <div>

        <img src="images/logo.png" alt="logo" className="img" />
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group-1">
            <Input type="text" className="form-control" name="username" value={username}
              onChange={onChangeUsername} validations={[required]} placeholder="Username"/>
          </div>
        </Form>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group-2">
            <Input type="password" className="form-control" name="password"
              value={password} onChange={onChangePassword} validations={[required]} 
              placeholder="Password" />
          </div>

          <div className="button">
            <button className="btn" disabled={loading}> {loading && (<span className="spinner-border spinner-border-sm"></span>)}
              <span>Connect</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <div id="elipse-4">
      <img src="images/elipse4.png" alt="elipse4" />
      </div>
      
    </>
  );
};

export default Login;