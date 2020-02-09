import React from "react";

const AuthPage = () => {
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
                           className="yellow-input"/>
                      <label htmlFor="email">First Name</label>
                  </div>
                  <div className="input-field">
                    <input placeholder="Password"
                           id="password"
                           type="password"
                           name="password"
                           className="yellow-input"/>
                      <label htmlFor="password">First Name</label>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button className="btn yellow darken-4">Log in</button>
                <button className="btn gray lighten-1">Sign up</button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default AuthPage;