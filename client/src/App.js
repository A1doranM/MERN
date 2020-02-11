import React from "react";
import "materialize-css";
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{token, logout, login, userId}}>
            <BrowserRouter>
                <div className="container">
                    <h1>{routes}</h1>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
