import React from 'react';
import { Tabs, Radio, Drawer, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import * as actions from "../store/actions/userData";

import { connect } from "react-redux";
import { setUsername } from "../store/actions/userData";
import Text from "antd/es/typography/Text";
const { TabPane } = Tabs;
class ChatDrawer extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         username: "nullUser"
    //     }
    // }

    render() {
        //this.props.setUsername("yeetles")
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
                    style={{ position: 'absolute' }}>
                    <div style={{position: 'absolute',
                                bottom: 0,
                                width: 430,
                                padding: 20}}>
                        <Row>
                            <Col span={18}>
                                <Input placeholder="Enter a message...">
                                </Input>
                            </Col>
                            <Col span={5} offset={1}>
                                <Button type="primary">
                                    Send
                                </Button>
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