import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Button, Row, Divider } from "antd";
import { NavLink } from "react-router-dom";
// import Editprofile from "./Editprofile";
import { UserOutlined } from "@ant-design/icons";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "" };
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <center>
        <Card style={{ width: 240 }}>
          <Row>
            <Avatar size={120}>
              <UserOutlined style={{ fontSize: "80px" }} />
            </Avatar>
          </Row>
          <Row style={{ padding: "10px" }}>
            Username: <b>{this.props.username}</b>
          </Row>
          <Divider> Account Updates </Divider>
          <Row style={{ padding: "5px" }}>
            <Button type="primary">Change Username</Button>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Button type="primary">Change Password</Button>
          </Row>
          <Divider>Questionnaires</Divider>
          <Row style={{ padding: "5px" }}>
            <NavLink to={{ pathname: "/quiz/1" }}>Pre-Study Quiz</NavLink>
          </Row>
          <Row style={{ padding: "5px" }}>
            <NavLink to={{ pathname: "/quiz/2" }}>Post-Study Quiz</NavLink>
          </Row>
          <Row style={{ padding: "5px" }}>
            <NavLink to={{ pathname: "/quiz/3" }}>
              1-Week Post-Study Quiz
            </NavLink>
          </Row>
        </Card>
      </center>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  username: state.auth.username,
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(ProfilePage);
