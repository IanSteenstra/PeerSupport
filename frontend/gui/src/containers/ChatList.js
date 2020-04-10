import React from 'react';
import { Button, Table, Avatar, Divider, Modal} from 'antd';
import ChatDrawer from './ChatDrawer';
import ChatPage from './ChatPage';
import {connect} from 'react-redux'
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
//import 'antd/dist/antd.css';
import axios from 'axios';
import Chat from './ChatUI'
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/message";

const data = [];
const { } = Table;

let currentUser = "";

class ChatList extends React.Component {

    state = {
        drawerVisible: false,
        modalVisible: false,
        currentMsg: null,
    };

    constructor(props) {
        super(props);
        let i;
        //data.length = 0; // Clear list of current chats
        for(i = 0; i < this.props.chats.length; i++){
            // data.push({
            //     key: i,
            //     name: this.props.people[i],
            // });
        }
    }

    test (currentUser) {
        alert(currentUser);
        //this.props.setUsername(currentUser);
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    showModal = () => {
        console.log("heeee: " + this.props.chats);
        this.setState({
            modalVisible: true,
        });
    };

    onCancel = () => {
        console.log("ir did ti");
        this.setState({
            modalVisible: false,
        });
    };


    // showDrawer () {
    //     console.log("Showing Drawer!")
    //     // //this.props.setUsername(currentUser);
    //     // console.log("Current User: " + this.props.username)
    //     //
    //     // this.setState(prevState => ({
    //     //     visible: !prevState.visible
    //     // }));
    // };

    render() {
        return (
            <div>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingBottom:20,
                }}>
                    <Button type="primary" onClick={() => { this.showModal();}}> Find New Chat </Button>
                </div>
                <Table dataSource={this.props.chats}>
                        <Column title="Name" dataIndex="name" key="name"
                                render={(text) => (
                                    <div>
                                        <Avatar size={32} icon="user"/>
                                        <a style={{paddingLeft:10}}>{text}</a>
                                    </div>
                                )}/>
                        <Column align="center" title="Actions" dataIndex="firstName" key="firstName"
                                render={(text, record) => (
                                    <div>
                                        <Button type="primary" onClick={() => { this.showDrawer(); currentUser=record.name;}}>
                                            Chat
                                        </Button>
                                        <a style={{paddingLeft:15}}> Archive </a>
                                        <Divider type="vertical" />
                                        <a> Delete </a>
                                    </div>
                                )}
                        />
                </Table>
                <ChatDrawer onClose={this.onClose} visible={this.state.drawerVisible} username={currentUser}/>
                <Modal visible={this.state.modalVisible} onCancel={this.onCancel}>
                    <ChatPage/>
                </Modal>
            </div>
        )
    }
}

//const WrappedChatList = Form.create()(ChatList);

const mapStateToProps = state => ({
    chats: state.message.chats
});

const mapDispatchToProps = dispatch => ({
    //setUsername: (username) => dispatch(setUsername(username))
});

//export default ChatList;
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);