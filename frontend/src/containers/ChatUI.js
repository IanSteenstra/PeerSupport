import React from 'react';
import WebSocketInstance from '../websocket';
import { Input, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import '../assets/MessageList.css';
import { connect } from 'react-redux';

class ChatUI extends React.Component {

  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.chatId
      );
    });
    WebSocketInstance.connect(this.props.chatId);
  }

  constructor(props) {
    super(props);
    this.state = { 
      message: "" 
    };
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.chatId
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else {
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } 
    return prefix;
  };

  renderMessages = messages => {
    const currentUser = this.props.username;
    return messages.map((message, i, arr) => (
      <li
        key={i}
        style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        <img
          src="https://img.icons8.com/color/48/000000/test-account.png"
          alt="profile-pic"
        />
        <p>
          {message.content}
          <br />
          <small>{this.renderTimestamp(message.timestamp)}</small>
        </p>
      </li>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.chatId !== newProps.chatId) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.chatId
        );
      });
      WebSocketInstance.connect(newProps.chatId);
    }
  }

  render() {
    const enter = (
      <SendOutlined 
       style={{ color: '#97d47cff', fontSize: 'large' }}
       onClick={this.sendMessageHandler}
      />
    );
    return (
      <div className="message-list">
        <Row>
          <div className="messages">
            <ul id="chat-log">
              {this.props.messages && this.renderMessages(this.props.messages)}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </ul>
          </div>
        </Row>
        <Row>
          <div className="message-input">
            <Input
              onPressEnter={this.sendMessageHandler}
              onChange={this.messageChangeHandler}
              value={this.state.message}
              size='large'
              id="chat-message-input"
              type="text"
              placeholder="Type your message..."
              suffix={enter}
              />
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    messages: state.message.messages
});

export default connect(mapStateToProps)(ChatUI);
  