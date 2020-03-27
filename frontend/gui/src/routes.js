import React from 'react';
import { Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";

const BaseRouter = () => (
    <div>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/" component={Home} />
    </div>
);

export default BaseRouter;