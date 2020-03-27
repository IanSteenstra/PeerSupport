import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import Chat from './ChatUI'

const { Search } = Input;

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pk: '',
            currentChat: ''
        };
    }

    componentDidMount() {
        const token_url = `http://127.0.0.1:8000/api/username/`;
        axios.post(token_url, { 'token': this.props.authToken }).then(response => response.data)
            .then((data) => {
                this.setState(
                    { username: data['username'] }
                )
                console.log(data)
                const user_url = `http://127.0.0.1:8000/api/user-pk/`;
                axios.post(user_url, { 'username': data['username'] }).then(response => response.data)
                    .then((data) => {
                        this.setState(
                            { pk: data['pk'] }
                        )
                    })
            })
    }

    createNewChat = value => {
        const user_url = `http://127.0.0.1:8000/api/user-pk/`;
        axios.post(user_url, { 'username': value }).then(response => response.data)
            .then((data) => {
                const url = 'http://127.0.0.1:8000/api/chats/create/';
                axios.post(url, { 'profilepks': [this.state.pk, data['pk']] }).then(response => response.data)
                    .then((data) => {
                        console.log(data)
                        this.setState(
                            { currentChat: data['pk'] }
                        )
                    })
            })
    }


    render() {
        const openChat = this.state.currentChat;
        return (
            <div>
                Search and create a chat with a user from searching for their username below!
                <Search placeholder="input username" onSearch={this.createNewChat} enterButton />
                {openChat != '' &&
                    <Chat chatURL={this.state.currentChat} username={this.state.username} pk={this.state.pk} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authToken: state.token
});

export default connect(mapStateToProps)(ChatPage);