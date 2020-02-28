
import React from 'react';
import { Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import Quiz from "./containers/Quiz";
import Home from "./containers/Home";

const BaseRouter = () => (
    <div>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/chat/" component={Chat} />
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/quiz/" component={Quiz} />
        <Route exact path="/" component={Home} />
    </div>
);

export default BaseRouter;