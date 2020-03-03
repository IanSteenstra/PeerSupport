
import React from 'react';
import { Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
<<<<<<< HEAD
import Home from "./containers/Home";
import Quiz from "./containers/Quiz";
=======
import Quiz from "./containers/Quiz";
import Home from "./containers/Home";
import ChatLayout from "./containers/Chat";
>>>>>>> chat_page

const BaseRouter = () => (
    <div>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
<<<<<<< HEAD
=======
        <Route exact path="/chat/" component={ChatLayout} />
>>>>>>> chat_page
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/quiz/" component={Quiz} />
        <Route exact path="/" component={Home} />
    </div>
);

export default BaseRouter;