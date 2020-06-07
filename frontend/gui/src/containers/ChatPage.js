import React from 'react';
import { Button, Layout, Menu} from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatUI from './ChatUI'
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/message";
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;



class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatVisible: false,
            currentChat: '',
            currChats: [{
                'key': '',
                'name': ''
            }],
            friends: [{
                'key': '',
                'name': ''
            }],
        };

        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
          );

        this.getCurrChats()
        this.getFriends()
    }

    getFriends = () => {
        const url = 'http://127.0.0.1:8000/get-friends/';
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        axios.get(url).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState(
                    { friends: data }
                )
            })
      }

    getNewChat = value => {
        const url = 'http://127.0.0.1:8000/api/chats/create/';
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        axios.post(url, { 'usernames': [this.props.username, value] }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ 
                    currentChat: data['pk'],
                    chatVisible: true
                })
                this.setState(state => {
                    return [...state.currChats, {'key': data['pk'], 'name': value}]
                })
            })
    }

    getCurrChats = () => {
        const url = 'http://127.0.0.1:8000/get-chats/';
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        axios.get(url).then(response => response.data)
            .then((data) => {
                    this.setState({ 
                        currChats: data
                    })
            })
      }

    showChat = value => {
        this.setState({
            currentChat: value,
            chatVisible: true 
        }); 
    }

    closeChat = () => {
        this.setState({
            chatVisible: false 
        }); 
    }


    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Current Chats">
                        {this.state.currChats.map(chat =>
                            <Menu.Item key={chat.key} onClick={() => this.showChat(chat.key)}>{chat.name}</Menu.Item>
                        )}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Friends">
                        {this.state.friends.map(friend =>
                            <Menu.Item key={friend.key} onClick={() => this.getNewChat(friend.name)}>{friend.name}</Menu.Item>
                        )}
                    </SubMenu>
                    </Menu>
                </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                {this.state.chatVisible && <ChatUI chatId={this.state.currentChat} username={this.props.username}/>}
                {this.state.chatVisible && <Button onClick={this.closeChat}>Close Chat</Button>}
                </Content>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
});

const mapDispatchToProps = dispatch => {
    return {
      addMessage: message => dispatch(messageActions.addMessage(message)),
      setMessages: messages => dispatch(messageActions.setMessages(messages))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);