import React from "react";
import logo from "../images/logo-hori.jpg";

class HomeLayout extends React.Component {
  render() {
    return (
      <center>
        <img src={logo} alt="PeerSupport Logo" />
        <p>
          PeerSupport is an anonymous peer-support web application that provides
          easy access for college students to get the help they need in a safe
          and reliable manner.
        </p>
      </center>
    );
  }
}

export default HomeLayout;
