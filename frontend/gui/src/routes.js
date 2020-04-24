
import React from 'react';
import { Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/ProfilePage";
import Quiz from "./containers/Quiz";
import Events from "./containers/Events";
import Home from "./containers/Home";
import ChatPage from "./containers/ChatPage";
// import ChangePassword from "./containers/ChangePassword";
import ChatList from "./containers/ChatList";


const BaseRouter = () => (
    <div>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/events/" component={Events} />
        <Route exact path="/chat/" component={ChatPage} />
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/quiz/" component={Quiz} />
        <Route exact path="/chatlist/" component={ChatList} />
        {/* <Route exact path="/changepassword/" component={ChangePassword} /> */}
        <Route exact path="/" component={Home} />
    </div>
);

export default BaseRouter;