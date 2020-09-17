import React from "react";
import logo from "../images/logo-vert.jpg";

class HomeLayout extends React.Component {
  render() {
    return (
      <center>
        <img src={logo} alt="PeerSupport Logo" />
        <p>
        PeerSupport is an anonymous peer support chat application that allows users to message each other without the worry of their identity being known. 
        Users can flag risky messages (ex: Suicidal Ideation, Potential Violence, Harassment), which only monitor admins can view and decide the best course of action to ensure a safe environment. 
        </p>
      </center>
    );
  }
}

export default HomeLayout;
