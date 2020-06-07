import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        userName: '',
        email: '',
        password: '',
        loading:'',
        error:''
    };
    onNameChange = ({ target: { value } }) => {
        this.setState({ userName:value} );
    };
    onEmailChange = ({ target: { value } }) => {
        this.setState({ email:value} );
    };
    onPasswordChange = ({ target: { value } }) => {
        this.setState({ password:value} );
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
                this.props.onAuth(
                    this.state.userName,
                    this.state.email,
                    this.state.password,
                );
                this.props.history.push('/');
            }
            else {
                console.log(err);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you entered are inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value = {this.state.name}
                               onChange={this.onNameChange}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your RPI E-mail!',
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="RPI Email" value = {this.state.email}
                               onChange={this.onEmailChange}/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value = {this.state.password}
                               onChange={this.onPasswordChange}/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Signup
                    </Button>
                </FormItem>

            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1 ) => dispatch(actions.authSignup(username, email, password1, password1))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
