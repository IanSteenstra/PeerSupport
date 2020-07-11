import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Button, Row, Divider } from "antd";
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

  openQuiz() {
    window.location = "/quiz/";
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
          <Divider />
          <Row style={{ padding: "5px" }}>
            <Button type="primary">Change Username</Button>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Button type="primary">Change Password</Button>
          </Row>
          <Divider />
          <Row style={{ padding: "5px" }}>
            <Button type="primary" onClick={this.openQuiz}>
              Pre-Study Quiz
            </Button>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Button type="primary" onClick={this.openQuiz}>
              Post-Study Quiz
            </Button>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Button type="primary" onClick={this.openQuiz}>
              1-Week Post-Study Quiz
            </Button>
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
