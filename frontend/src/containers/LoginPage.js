import React from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.userName, values.password);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/chat");
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <center>
        <Card style={{ width: 300, textAlign: "center" }}>
          {this.props.error && (
            <Alert
              message="Login Error"
              description="Either your Username/Password is incorrect or your have not confirmed your email yet!"
              type="error"
              style={{ width: 250, textAlign: "center" }}
              showIcon
            />
          )}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" },
                ],
              })(
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="username"
                  placeholder="Username"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                ],
              })(
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
              Or
              <NavLink style={{ marginRight: "10px" }} to="/register">
                {" "}
                register now!
              </NavLink>
            </Form.Item>
          </Form>
        </Card>
      </center>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
