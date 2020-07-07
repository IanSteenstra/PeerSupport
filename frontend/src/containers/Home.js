import React from "react";
import logo from "../images/logo-hori.jpg";

class HomeLayout extends React.Component {
  render() {
    return (
      <div>
        <img src={logo} alt="TherapyNow Logo" />
        <p>
          TherapyNow is an anonymous peer-support web application that provides
          easy access for college students get the help that they need in a safe
          and reliable manner.
        </p>
      </div>
    );
  }
}

export default HomeLayout;
