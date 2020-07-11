import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/LoginPage";
import Register from "./containers/RegisterPage";
import Profile from "./containers/ProfilePage";
import Quiz from "./containers/QuizPage";
import Events from "./containers/EventsPage";
import Home from "./containers/HomePage";
import Chat from "./containers/ChatPage";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/quiz" component={Quiz} />
    <Route path="/chat" component={Chat} />
  </div>
);

export default BaseRouter;
