import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/htttp.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) =>{
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
      try{
          const data = await request("/api/auth/register", "POST", {...form});
          message(data.message);
      } catch (e) {
          console.log(e);
      }
    };

    const loginHandler = async () => {
        try{
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>Cut link</h1>
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Authorize</span>
                <div>
                  <div className="input-field">
                    <input placeholder="Email"
                           id="email"
                           type="text"
                           name="email"
                           onChange={changeHandler}
                           className="yellow-input"/>
                      <label htmlFor="email">First Name</label>
                  </div>
                  <div className="input-field">
                    <input placeholder="Password"
                           id="password"
                           type="password"
                           name="password"
                           onChange={changeHandler}
                           className="yellow-input"/>
                      <label htmlFor="password">First Name</label>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button className="btn yellow darken-4" onClick={loginHandler}>Log in</button>
                <button className="btn gray lighten-1" onClick={registerHandler} disabled={loading}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default AuthPage;