<<<<<<< Updated upstream
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

=======
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
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/quiz/" component={Quiz} />
        <Route exact path="/" component={Home} />
    </div>
);

>>>>>>> Stashed changes
export default BaseRouter;