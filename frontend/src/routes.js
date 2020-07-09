import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";
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
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/quiz" component={Quiz} />
    {/* <Route exact path="/changepassword/" component={ChangePassword} /> */}
    <Route path="/chat" component={ChatPage} />
  </Hoc>
);

export default BaseRouter;
