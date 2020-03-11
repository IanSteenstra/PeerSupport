import React from 'react';
import { Tabs, Radio, Drawer, Input, Button, List } from 'antd';
import { Row, Col } from 'antd';
import MessageInstance from "./MessageInstance";
import * as actions from "../store/actions/userData";

import { connect } from "react-redux";
import { setUsername } from "../store/actions/userData";
import Text from "antd/es/typography/Text";
const { TabPane } = Tabs;
const { Search } = Input;

const data = [
    'Test1',
    'Test2'
];

class ChatDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }

    // Function that handles event of sending a message
    // Currently, the only data that is sent is the message itself
    // and the username of who it is being sent to.
    onSend(value, usr) {
        var newStateArray = [...this.state.data];
        newStateArray.push("Default User: " + value);
        //document.getElementById("message-box").value="";
        this.setState(() => {
            return {
                data: newStateArray
            };
        });
    };

    render() {
        return (
            <div>
                <Drawer
                    title={this.props.username}
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    getContainer={false}
                    width="60%"
                    height ="100%"
                    >
                    <List
                        id="msg-list"
                        dataSource={this.state.data}
                        renderItem={item => <List.Item>{item}</List.Item>}>
                    </List>
                    <div style={{position: 'absolute',
                        bottom: 0,
                        width: "90%",
                        padding: 20}}>
                        <Row>
                            <Col span={18}>
                                <Search
                                    id="message-box"
                                    placeholder="Enter a message..."
                                    enterButton="Send"
                                    onSearch={value =>
                                        this.onSend(value, this.props.username)}>
                                </Search>
                            </Col>
                        </Row>
                    </div>
                </Drawer>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     username: state.userReducer.username
// })

export default ChatDrawer;
//export default connect(mapStateToProps)(ChatDrawer);