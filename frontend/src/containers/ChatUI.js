import React from "react";
import axios from "axios";
import WebSocketInstance from "../websocket";
import { Input, Row, Popover, Radio, Button, Divider } from "antd";
import { SendOutlined, FlagFilled } from "@ant-design/icons";
import "../assets/MessageList.css";
import { connect } from "react-redux";

class ChatUI extends React.Component {
  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatId
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatId);
  }

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      flagType: 1,
      showFlagPopup: false,
    };
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
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

  messageChangeHandler = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatId,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  onFlagChange = (e) => {
    this.setState({
      flagType: e.target.value,
    });
  };

  showFlagPopup = () => {
    this.setState({ showFlagPopup: true });
  };

  onFlagSubmit = (message) => {
    const url = `${process.env.REACT_APP_HOST_IP_ADDRESS}/api/flags/`;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .post(url, {
        flag_type: this.state.flagType,
        content: message.content,
        flagged_user: message.author,
      })
      .then((res) => this.setState({ showFlagPopup: false }))
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  renderTimestamp = (timestamp) => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 2) {
      prefix = `${timeDiff} minute ago`;
    } else if (timeDiff < 60) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff / 60 < 2) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hour ago`;
    } else if (timeDiff < 24 * 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff > 24 * 60 && timeDiff / (60 * 24) < 2) {
      prefix = `${Math.round(timeDiff / (60 * 24))} day ago`;
    } else {
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    }
    return prefix;
  };

  renderFlagForm = (message) => {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    return (
      <div>
        <Row>{message.content}</Row>
        <Divider />
        <Row>
          <Radio.Group onChange={this.onFlagChange} value={this.state.flagType}>
            <Radio style={radioStyle} value={1}>
              The message inidates a suicidal ideation
            </Radio>
            <Radio style={radioStyle} value={2}>
              The message inidates planning to hurt someone
            </Radio>
            <Radio style={radioStyle} value={3}>
              The message is harassment
            </Radio>
          </Radio.Group>
        </Row>
        <Row
          style={{
            padding: 8,
          }}
        >
          <center>
            <Button onClick={() => this.onFlagSubmit(message)}>Submit</Button>
          </center>
        </Row>
      </div>
    );
  };

  renderMessages = (messages) => {
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
          {message.author === currentUser || (
            <small>
              <Popover
                title={<center>Why are you flagging this message?</center>}
                trigger="click"
                content={this.renderFlagForm(message)}
                visible={this.state.showFlagPopup}
                onClick={() => this.showFlagPopup()}
                placement="right"
              >
                <FlagFilled style={{ padding: "10px", color: "#ffa9a3" }} />
              </Popover>
            </small>
          )}
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
    if (this.props.match.params.chatId !== newProps.match.params.chatId) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.chatId
        );
      });
      WebSocketInstance.connect(newProps.match.params.chatId);
    }
  }

  render() {
    const enter = (
      <SendOutlined
        style={{ color: "#97d47cff", fontSize: "large" }}
        onClick={this.sendMessageHandler}
      />
    );
    return (
      <div>
        <Row>
          <div className="messages">
            <ul id="chat-log">
              {this.props.messages && this.renderMessages(this.props.messages)}
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
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
              size="large"
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
  messages: state.message.messages,
  username: state.auth.username,
});

export default connect(mapStateToProps)(ChatUI);
