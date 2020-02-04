import React from 'react';
import { Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Chat from "./containers/Chat";

const BaseRouter = () => (
    <div>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/chat/" component={Chat} />
        <Route exact path="/" component={Home} />
    </div>
);

export default BaseRouter;