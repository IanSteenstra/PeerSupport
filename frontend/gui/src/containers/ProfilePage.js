import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Avatar, Descriptions, Button } from 'antd';
import Editprofile from "./Editprofile";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", email: ""};
    }

    componentDidMount() {
        const url = `http://127.0.0.1:8000/api/username/`;
        axios.post(url, { 'headers': { 'Authorization': 'Token ' + this.props.authToken }, 'token': this.props.authToken }).then(response => response.data)
            .then((data) => {
                this.setState(
                    { username: data['username'], email: data['email']}
                )
            })
    }
    openQuiz() {
        window.location='/quiz/';
    }
    render() {
        return(
            <div style={{display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'left',
                paddingBottom:20
            }}>
                <Avatar style={{backgroundColor: '#0066ff',
                    verticalAlign: 'middle',
                    alignContent: 'middle',
                    fontSize: 64,}} size={128} > {String(this.props.username).charAt(0).toUpperCase()}</Avatar>
                <p></p>
                <Editprofile></Editprofile>
                <p></p>
                <Button type="primary" onClick={this.openQuiz}>Take Quiz</Button>
                <Descriptions
                    title="Your Profile"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Username">{this.props.username}</Descriptions.Item>
                    <Descriptions.Item label="Email Address">{this.state.email}</Descriptions.Item>
                </Descriptions>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.token,
    username: state.auth.username
});

export default connect(mapStateToProps)(ProfilePage);