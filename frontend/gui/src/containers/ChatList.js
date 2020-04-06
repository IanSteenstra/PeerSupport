import React from 'react';
import { Button, Table, Avatar, Divider} from 'antd';
import ChatDrawer from './ChatDrawer';
import {connect} from 'react-redux'
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
//import 'antd/dist/antd.css';

const data = [];
const { } = Table;

let currentUser = "";

class ChatList extends React.Component {

    state = {
        visible: false,
        currentMsg: null,
    };

    constructor(props) {
        super(props);
        let i;
        data.length = 0; // Clear list of current chats
        for(i = 0; i < this.props.people.length; i++){
            data.push({
                key: i,
                name: this.props.people[i],
            });
        }
    }

    test (currentUser) {
        alert(currentUser);
        //this.props.setUsername(currentUser);
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
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
                    <Button type="primary"> Find New Chat </Button>
                </div>
                <Table dataSource={data}>
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
                                        <Button type="primary" onClick={() => { this.showDrawer(); currentUser=record.name;}
                                        }>
                                            Chat
                                        </Button>
                                        <a style={{paddingLeft:15}}> Archive </a>
                                        <Divider type="vertical" />
                                        <a> Delete </a>
                                    </div>
                                )}
                        />
                </Table>
                <ChatDrawer onClose={this.onClose} visible={this.state.visible} username={currentUser}/>
            </div>
        )
    }
}

//const WrappedChatList = Form.create()(ChatList);

// const mapStateToProps = state => ({
//         username: state.userReducer.username
// })
//
// const mapDispatchToProps = dispatch => ({
//     setUsername: (username) => dispatch(setUsername(username))
// })

export default ChatList;
//export default connect(mapStateToProps, mapDispatchToProps)(ChatList);