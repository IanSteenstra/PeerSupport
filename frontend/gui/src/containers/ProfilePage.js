import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello {this.props.username}, this is your profile page!
            </div>

        );
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.token,
    username: state.auth.username
});

export default connect(mapStateToProps)(ProfilePage);