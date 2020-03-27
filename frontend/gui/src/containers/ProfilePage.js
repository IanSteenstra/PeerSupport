import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "" };
    }

    componentDidMount() {
        const url = `http://127.0.0.1:8000/api/username/`;
        axios.post(url, { 'headers': { 'Authorization': 'Token ' + this.props.authToken }, 'token': this.props.authToken }).then(response => response.data)
            .then((data) => {
                this.setState(
                    { username: data['username'] }
                )
            })
    }

    render() {
        return (
            <div>
                Hello {this.state.username}, this is your profile page!
            </div>

        );
    }
}

const mapStateToProps = state => ({
    authToken: state.token
});

export default connect(mapStateToProps)(ProfilePage);