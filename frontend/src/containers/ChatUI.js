import React from 'react';
import moment from 'moment';
import WebSocketInstance from '../websocket';
import Message from "./Message";
import '../assets/MessageList.css';
import '../assets/ChatTitle.css';

import { connect } from 'react-redux';

const title = 'Hi'

class ChatUI extends React.Component {

    constructor(props) {
      super(props);
        this.state = { 
            message: "" 
        };

        this.initialiseChat();
      }
    
    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(this.props.username, this.props.chatId);
        });
        WebSocketInstance.connect(this.props.chatId)
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

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

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

    renderMessages = messages => {
      let i = 0;
      let messageCount = messages.length;
      let tempMessages = [];
  
      while (i < messageCount) {
        let previous = messages[i - 1];
        let current = messages[i];
        let next = messages[i + 1];
        let isMine = current.author === this.props.username;
        let currentMoment = moment(current.timestamp);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = true;
  
        if (previous) {
          let previousMoment = moment(previous.timestamp);
          let previousDuration = moment.duration(currentMoment.diff(previousMoment));
          prevBySameAuthor = previous.author === current.author;
          
          if (prevBySameAuthor && previousDuration.as('hours') < 1) {
            startsSequence = false;
          }
  
          if (previousDuration.as('hours') < 1) {
            showTimestamp = false;
          }
        }
  
        if (next) {
          let nextMoment = moment(next.timestamp);
          let nextDuration = moment.duration(nextMoment.diff(currentMoment));
          nextBySameAuthor = next.author === current.author;
  
          if (nextBySameAuthor && nextDuration.as('hours') < 1) {
            endsSequence = false;
          }
        }
  
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
  
        // Proceed to the next message.
        i += 1;
      }
  
      return tempMessages;
    };


    render() {
        return (
          <div>
              <div className="message-list">
                <div className="header"><h1 className="chat-title">{ this.props.chatId }</h1></div>
                <div className="message-list-container">{this.renderMessages(this.props.messages)}</div>
              </div>
              <div className="message-input">
                  <form onSubmit={this.sendMessageHandler}>
                      <div className="wrap">
                      <input
                          onChange={this.messageChangeHandler}
                          value={this.state.message}
                          required
                          id="chat-message-input"
                          type="text"
                          placeholder="Write your message..."
                      />
                      <i className="fa fa-paperclip attachment" aria-hidden="true" />
                      <button id="chat-message-submit" className="submit">
                          <i className="fa fa-paper-plane" aria-hidden="true" />
                      </button>
                      </div>
                  </form>
              </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.message.messages
});

export default connect(mapStateToProps)(ChatUI);
  