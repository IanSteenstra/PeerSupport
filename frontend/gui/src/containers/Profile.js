import React from 'react';
import {Avatar, Descriptions, Button } from 'antd';
import Editprofile from "./Editprofile";
class Profile extends React.Component {
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
                <Avatar size={128} icon={"user"}/>
                <p></p>
                <Editprofile></Editprofile>
                <p></p>
                <Button type="primary" onClick={this.openQuiz} >Take Quiz</Button>
                <Descriptions
                    title="Your Profile"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Name">Sample Name</Descriptions.Item>
                    <Descriptions.Item label="Email Address">email@rpi.edu</Descriptions.Item>
                    <Descriptions.Item label="Anonymous ID">1234565432</Descriptions.Item>
                    <Descriptions.Item label="Gender">Male</Descriptions.Item>
                    <Descriptions.Item label="Bio">Placeholder bio brief information about me</Descriptions.Item>

                </Descriptions>
            </div>

        );
    }
}

export default Profile;