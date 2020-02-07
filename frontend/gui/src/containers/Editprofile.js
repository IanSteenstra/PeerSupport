import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
const currentName = 'sample name';
const currentBio = 'Placeholder bio brief information about me';
const currentGender = 'male';
class Editprofile extends React.Component {
    state = {
        ModalText: '',
        visible: false,
        confirmLoading: false,
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
            });
        }, 1000);
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
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Name cannot be blank.' }]}
                        >
                            <Input defaultValue=
                                       {currentName}/>
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Input defaultValue={currentGender} type="textarea" />
                        </Form.Item>
                        <Form.Item name="bio" label="Bio">
                            <Input defaultValue={currentBio} type = "textarea" rows={8} />
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

