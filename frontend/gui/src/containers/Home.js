import React from 'react';
import logo from '../images/logo-hori.jpg';

class HomeLayout extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} />
                <p>TherapyNow is an anonymous instant-messaging app that
                provides one-on-one therapeutic conversations with other
                users, trained and professional counselors. Using data
                from the top experts in psychology, the app will be able
                to effectively pair two users together that have the highest
                chance of developing trust and impactful conversations the
                quickest. In addition, there will be set times where users
                will be able to message with trained and/or professional counselors
                at RPI.</p>
            </div>
        )
    }
}

export default HomeLayout;