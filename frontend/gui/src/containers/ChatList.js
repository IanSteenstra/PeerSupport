import React from 'react';
import { Button, Table, Divider, Modal} from 'antd';
import ChatDrawer from './ChatDrawer';
import ChatPage from './ChatPage';
// import {connect} from 'react-redux'
// import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
// import axios from 'axios';
// import Chat from './ChatUI'
// import WebSocketInstance from "../websocket";
// import * as messageActions from "../store/actions/message";

const listColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Button type="primary" >Open Chat</Button>
        )
    }
]

class ChatList extends React.Component {

    state = {
        drawerVisible: false,
        modalVisible: false,
        currentMsg: null,
        username: "fish!"
    };

    constructor(props) {
        super(props);
        console.log(this.props.prevChats)
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
                <Table dataSource={this.props.prevChats} columns={listColumns}/>
                <ChatDrawer onClose={this.onClose} visible={this.state.drawerVisible} username={this.props.username}/>
                <Modal visible={this.state.modalVisible} onCancel={this.onCancel}>
                    <ChatPage/>
                </Modal>
            </div>
        )
    }
}

export default ChatList;