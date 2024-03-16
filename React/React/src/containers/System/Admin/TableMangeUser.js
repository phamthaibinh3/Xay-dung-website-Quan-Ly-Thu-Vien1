import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangeUser.scss'
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions'


class TableMangeUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                userRedux: this.props.listUser
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
        // handleEditUserFromParent
    }

    render() {
        console.log('check data redux ', this.props.listUser);
        let arrUser = this.state.userRedux
        return (
            <>
                <table id='TableMangeUser'>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                    </tr>
                    <>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.taiKhoan}</td>
                                        <td>{item.hoTen}</td>
                                        <td>{item.diaChi}</td>
                                        <td>{item.dienThoai}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </>

                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        updateUserRedux: (data) => dispatch(actions.updateUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMangeUser);
