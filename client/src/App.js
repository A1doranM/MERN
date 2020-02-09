import React from "react";
import "materialize-css";
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
    const routes = useRoutes(false);
    return (
        <BrowserRouter>
            <div className="container">
                <h1>{routes}</h1>
            </div>
        </BrowserRouter>
    );
}

export default App;
