import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import CustomLayout from "./containers/Layout";
import WebSocketInstance from "./websocket";
import * as messageActions from "./store/actions/message";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
    addMessage: (message) => dispatch(messageActions.addMessage(message)),
    setMessages: (messages) => dispatch(messageActions.setMessages(messages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
