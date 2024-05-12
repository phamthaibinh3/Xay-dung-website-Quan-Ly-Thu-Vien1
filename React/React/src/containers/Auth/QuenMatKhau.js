import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleXacNha = () => {
        this.props.resetMatKhau({
            email: this.state.email
        })
    }

    render() {
        console.log('check id: ', this.state);


        return (
            <div className='login-background'>
                email <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <button onClick={() => this.handleXacNha()}>Xác nhận</button>
            </div >

        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetMatKhau: (data) => dispatch(actions.resetMatKhau(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
