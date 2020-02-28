import React from 'react';
import { Drawer } from 'antd';
import * as actions from "../store/actions/userData";
import {connect} from "react-redux";
import {setUsername} from "../store/actions/userData";
import Text from "antd/es/typography/Text";

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
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    getContainer={false}
                    width="60%"
                    style={{ position: 'absolute' }}>
                    <Text>{this.props.username}</Text>
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