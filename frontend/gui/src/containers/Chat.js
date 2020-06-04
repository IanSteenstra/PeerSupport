import React from 'react';
import { Typography } from 'antd';
// import { Events } from './Events';
import ChatList from './ChatList';
import ChatDrawer from './ChatDrawer';

const { Title } = Typography;

class ChatLayout extends React.Component {
    render() {
        return (
            <div>
                <Title>Messages</Title>
                <ChatList people={["Bobby Smith", "United Bagels"]}/>
                {/* <Title>Events</Title> */}
                {/* <Events/> */}
                <ChatDrawer/>
            </div>
        )
    }
}

export default ChatLayout;