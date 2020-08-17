import React from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  HomeOutlined,
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout" style={{ overflow: "auto" }}>
        <Header style={{ background: "#97d47cff", textAlign: "center" }}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px", background: "#97d47cff" }}
          >
            <Menu.Item key="/">
              <Link to="/">
                <HomeOutlined />
                Home
              </Link>
            </Menu.Item>

            <Menu.Item key="/events">
              <Link to="/events">
                <CalendarOutlined />
                Events
              </Link>
            </Menu.Item>
            {this.props.isAuthenticated && (
              <Menu.Item key="/chat">
                <Link to="/chat">
                  <MessageOutlined />
                  Chat
                </Link>
              </Menu.Item>
            )}
            {this.props.isAuthenticated && (
              <Menu.Item key="/profile">
                <Link to="/profile">
                  <UserOutlined />
                  Profile
                </Link>
              </Menu.Item>
            )}
            {this.props.isAuthenticated && this.props.isRiskMonitor && (
              <Menu.Item key="/risk-monitoring">
                <Link to="/risk-monitoring">
                  <MonitorOutlined />
                  Risk Monitoring
                </Link>
              </Menu.Item>
            )}
            {this.props.isAuthenticated ? (
              <Menu.Item key="/login" onClick={this.props.logout}>
                <LogoutOutlined />
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="/login">
                <Link to="/login">
                  <LoginOutlined />
                  Login
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            {this.props.children}
          </Layout>
        </Content>
        <Footer
          style={{
            borderTop: "1px solid #e8e8e8",
            textAlign: "center",
          }}
        >
          PeerSupport 2020 | Contact: Ian Steenstra - steenstra.ian@gmail.com
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
