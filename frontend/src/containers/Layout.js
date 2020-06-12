import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{ background: '#97d47cff' }}>
                    
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', background: '#97d47cff' }}
                    >   
                        
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="2">
                            <Link to="/events">Events</Link>
                        </Menu.Item>
                        {
                            this.props.isAuthenticated ?
                                <Menu.Item key="3">
                                    <Link to="/chat">Chat</Link>
                                </Menu.Item>
                                :
                                <Menu.Item key="3" disabled>
                                    Chat
                        </Menu.Item>
                        }
                        {
                            this.props.isAuthenticated ?

                                <Menu.Item key="4">
                                    <Link to="/profile">Profile</Link>
                                </Menu.Item>
                                :
                                <Menu.Item key="4" disabled>
                                    Profile
                                </Menu.Item>

                        }
                        {
                            this.props.isAuthenticated ?
                                <Menu.Item key="5" onClick={this.props.logout}>
                                    Logout
                                </Menu.Item>

                                :

                                <Menu.Item key="5">
                                    <Link to="/login/">Login</Link>
                                </Menu.Item>
                        }
                        
                    </Menu>
                    
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}     
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TherapyNow 2020 | Contact: Ian Steenstra - steenstra.ian@gmail.com</Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));