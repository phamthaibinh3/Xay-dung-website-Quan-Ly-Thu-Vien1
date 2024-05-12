import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginApi } from '../../services/userService';


import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            profile: null,
        }
    }

    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        // localStorage.clear();
        this.setState({
            errMessage: ''
        })
        // alert('Longin')
        console.log(this.state.username);
        console.log(this.state.password);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            console.log('check user ',data.user)
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login succeeds');
            }
        } catch (error) {
            if (error.response) {
                this.setState({
                    errMessage: error.response.data.message
                })
            }
            console.log('thai binh', error.response);
        }
    }

    handleShowHidePassword = () => {
        // alert('Thai binh')
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }

    handleLoginWithFacebook = async (profile) => {
        console.log('check profile: ',profile);
        try {
            await this.props.loginFaceBook({
                taiKhoan: profile.data.email,
                ten: profile.data.name,
            });
            console.log('check asasdasd: ', profile.data.name);
            this.props.userLoginSuccess({
                hoTen: profile.data.name,
                taiKhoan: profile.data.email,
                id: this.props.idFB
            });
            this.props.navigate('/');
        } catch (error) {
            console.log('Error while logging in with Facebook:', error);
            this.setState({
                errMessage: 'An error occurred while logging in with Facebook.'
            });
        }
    }


    handleQuenMatKhau = () => {
        this.props.history.push(`/quen-mat-khau`)
    }

    render() {
        console.log('check id: ', this.props.idFB);


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input
                                onChange={(event) => this.handleOnchangeUsername(event)}
                                value={this.state.username}
                                type='text' className='form-control'
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    value={this.state.password}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span
                                    onClick={() => this.handleShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>

                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span onClick={() => this.handleQuenMatKhau()} className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>

                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            {/* <i className="fab fa-google-plus-g google"></i> */}
                           <div>
                                <LoginSocialGoogle
                                    client_id = {
                                        "905935473669-jht8kdul73ldpi8aj3fu091oou3qlbmk.apps.googleusercontent.com"
                                    }
                                    // onResolve={this.handleLoginWithFacebook}
                                    scope = "openid profile email"
                                    onResolve={this.handleLoginWithFacebook}
                                    onReject={(e) => {
                                        console.log(e);
                                        this.setState({
                                            errMessage: 'An error occurred while logging in with Facebook.'
                                        });
                                    }}
                                >
                                    <GoogleLoginButton />
                                </LoginSocialGoogle>
                           </div>
                            <div>
                                <LoginSocialFacebook
                                    appId="355315360890205"
                                    onResolve={this.handleLoginWithFacebook}
                                    onReject={(e) => {
                                        console.log(e);
                                        this.setState({
                                            errMessage: 'An error occurred while logging in with Facebook.'
                                        });
                                    }}
                                >
                                    <FacebookLoginButton />
                                </LoginSocialFacebook>
                            </div>
                            {/* <i class="fab fa-facebook-f facebook"></i> */}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        idFB: state.admin.idFB
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        loginFaceBook: (data) => dispatch(actions.loginFaceBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
