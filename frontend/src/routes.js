import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/ProfilePage";
import Quiz from "./containers/Quiz";
import Events from "./containers/Events";
import Home from "./containers/Home";
import ChatPage from "./containers/ChatPage";
import Hoc from "./hoc/hoc";
// import ChangePassword from "./containers/ChangePassword";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/events" component={Events} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/quiz" component={Quiz} />
    {/* <Route exact path="/changepassword/" component={ChangePassword} /> */}
    <Route path="/chat" component={ChatPage} />
  </Hoc>
);

export default BaseRouter;
