import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import Chat from './ChatUI'
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/message";

const { Search } = Input;

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChat: ''
        };
        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
          );
    }

    createNewChat = value => {
        const url = 'http://127.0.0.1:8000/api/chats/create/';
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        console.log([this.props.username, value])
        axios.post(url, { 'usernames': [this.props.username, value] }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState(
                    { currentChat: data['pk'] }
                )
            })
    }

    startChat = value => {
        this.setState(
            { currentChat: value }
        )    
    }


    render() {
        const openChat = this.state.currentChat;
        return (
            <div>
                Search and create a chat with a user from searching for their username below!
                <Search placeholder="input username" onSearch={this.createNewChat} enterButton />
                Search for an existing chat room!
                <Search placeholder="input chat room name" onSearch={this.startChat} enterButton />
                {openChat != '' &&
                    <Chat chatId={this.state.currentChat} username={this.props.username}  />
                }
            </div>
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