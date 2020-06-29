import React from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import ChatUI from "./ChatUI";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChat: "",
      currChats: [
        {
          key: "",
          name: "",
        },
      ],
      friends: [
        {
          key: "",
          name: "",
        },
      ],
    };

    this.getCurrChats();
    this.getFriends();
  }

  getFriends = () => {
    const url = "http://127.0.0.1:8000/get-friends/";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ friends: data });
      });
  };

  getNewChat = (value) => {
    const url = "http://127.0.0.1:8000/api/chats/create/";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .post(url, { usernames: [this.props.username, value] })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({
          currentChat: data["pk"],
        });
        this.setState((state) => {
          return [...state.currChats, { key: data["pk"], name: value }];
        });
      });
  };

  getCurrChats = () => {
    const url = "http://127.0.0.1:8000/get-chats/";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          currChats: data,
        });
      });
  };

  showChat = (value) => {
    this.setState({
      currentChat: value,
    });
  };

  render() {
    return (
      <Layout>
        <Sider>
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Current Chats">
              {this.state.currChats.map((chat) => (
                <Menu.Item key={chat.key}>
                  <NavLink to={`/chat/${chat.key}`}>
                    {chat.name}
                    {chat.key}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
            <SubMenu key="sub2" title="Friends">
              {this.state.friends.map((friend) => (
                <Menu.Item
                  key={friend.key}
                  onClick={() => this.getNewChat(friend.name)}
                >
                  {friend.name}
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Route exact path={`/chat/:chatId`} component={ChatUI} />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  username: state.auth.username,
});

export default connect(mapStateToProps)(ChatPage);
