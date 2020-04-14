import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

//these values would be fetched from database, placeholders for now.
const currentName = 'sample name';
const currentBio = 'Placeholder bio brief information about me';
const currentGender = 'male';
class Editprofile extends React.Component {
    state = {

        //stores value of new name, gender, bio, from edit profile page, empty string if not to be changed
        name: '',
        gender: '',
        bio: '',
        ModalText: '',
        visible: false,
        confirmLoading: false,
    };

    onNameChange = ({ target: { value } }) => {
        this.setState({ name:value} );
    };
    onBioChange = ({ target: { value } }) => {
        this.setState({bio:value });
    };
    onGenderChange = ({ target: { value } }) => {
        this.setState({ gender:value });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            ModalText: 'Saving Changes...',
            confirmLoading: true,
        });

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                ModalText: '',
            });
        }, 1000);
        console.log("name:", this.state.name, "bio:", this.state.bio, "gender:", this.state.gender);
        //here is where code to submit info to database would go
        this.setState({
            name: '',
            gender: '',
            bio: '',
        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Edit Profile
                </Button>
                <Modal
                    title="Edit Profile"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                <Form
                        layout="vertical">
                        <Form.Item name="name" label="Name" >
                            <Input placeholder={currentName} value = {this.state.name}
                                   onChange={this.onNameChange}/>
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Input placeholder={currentGender} value = {this.state.gender}
                                   onChange={this.onGenderChange} type="textarea" />
                        </Form.Item>
                        <Form.Item name="bio" label="Bio">
                            <Input
                                placeholder={currentBio}
                                value = {this.state.bio}
                                onChange={this.onBioChange}
                                autosize={{ minRows: 3, maxRows: 8}}
                            />
                        </Form.Item>
                        <Button type="primary">Reset password</Button>
                        <p></p>
                        <Button type="primary">Change Profile Picture</Button>
                    </Form>
                    <p></p>
                    <p>{ModalText}</p>
                </Modal>
            </div>
        );
    }
}

export default Editprofile;