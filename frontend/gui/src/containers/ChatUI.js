import React from 'react';
import WebSocketInstance from '../websocket';
import { Tabs, Radio, Drawer, Input, Button, List } from 'antd';
import { Row, Col } from 'antd';
const { Search } = Input;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    componentDidMount() {
        WebSocketInstance.connect(this.props.chatURL)
    }


    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message] });
    }

    setMessages(messages) {
        this.setState({ messages: messages.reverse() });
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (message, username) => {
        const messageObject = {
            from: username,
            content: message,
        };
        console.log(messageObject)
        WebSocketInstance.newChatMessage(messageObject);
    }

    renderMessages = (messages) => {
        const currentUser = this.props.username;
        return messages.map((message, i) => (
            <li
                key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <p>{message.content}
                    <br />
                    <small className={message.author === currentUser ? 'sent' : 'replies'}>
                        {Math.round((new Date().getTime() - new Date(message.timestamp).getTime()) / 60000)} minutes ago
                    </small>
                </p>
            </li>
        ));
    }

    render() {
        const messages = this.state.messages;
        return (
            <div>
                <List
                    id="msg-list"
                    dataSource={messages}
                    renderItem={item => <List.Item>{item}</List.Item>}>
                </List>
                <Search
                    id="message-box"
                    placeholder="Enter a message..."
                    enterButton="Send"
                    onSearch={value =>
                        this.sendMessageHandler(value, this.props.username)}>
                </Search>
            </div>
        );
    };
}

export default Chat;