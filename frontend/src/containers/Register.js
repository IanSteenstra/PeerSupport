import React from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    loading: "",
    error: "",
  };
  onNameChange = ({ target: { value } }) => {
    this.setState({ userName: value });
  };
  onEmailChange = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  onPasswordChange = ({ target: { value } }) => {
    this.setState({ password: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.register(values.userName, values.email, values.password);
      } else {
        console.log(err);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you entered are inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  // validateEmail = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if ("@rpi.edu" in form.getFieldValue("email")) {
  //     form.validateFields(["email"], { force: true });
  //   }
  //   callback();
  // };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <center>
        {this.props.registered && !this.props.isAuthenitcated ? (
          <Alert
            message="Registration Successful!"
            description="We sent you a confirmation email. You must confirm your email address before logging in!"
            type="success"
            style={{ width: 300, textAlign: "center" }}
            showIcon
          />
        ) : (
          <Card style={{ width: 300, textAlign: "center" }}>
            {this.props.error && (
              <Alert
                message="Register Error"
                description="Either your Username/Password is incorrect or your have not confirmed your email yet!"
                type="error"
                style={{ width: 250, textAlign: "center" }}
                showIcon
              />
            )}
            <Form onSubmit={this.handleSubmit} className="register-form">
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ],
                })(
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    onChange={this.onNameChange}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your RPI email!",
                    },
                    {
                      type: "email",
                      message: "The input is not an email!",
                    },
                    // {
                    //   validator: this.validateEmail,
                    //   message: "Whattttttttttttttt",
                    // },
                  ],
                })(
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="RPI Email"
                    onChange={this.onEmailChange}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                    onBlur={this.handleConfirmBlur}
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Register
                </Button>
                Or
                <NavLink style={{ marginRight: "10px" }} to="/login">
                  {" "}
                  login
                </NavLink>
              </Form.Item>
            </Form>
          </Card>
        )}
      </center>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    registered: state.auth.registered,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, password1) =>
      dispatch(actions.authRegister(username, email, password1, password1)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
